import React from 'react'
import { Row, Col, Card } from 'antd'
import { useQuery } from '@apollo/react-hooks'
import moment from 'moment'
import gql from 'graphql-tag'
import NumberFormat from 'react-number-format'

import DefaultLayout from '../components/DefaultLayout'
import Container from '../components/Container'
import DescItem from '../components/DescItem'
import CopyToClipboard from '../components/CopyToClipboard'
import NotFound from '../components/Errors/NotFound'
import LoaderPage from '../components/LoaderPage'
import {
  SendMoney,
  NodeRegistration,
  RemoveNodeRegistration,
  ClaimNodeRegistration,
  SetupAccount,
  RemoveAccount,
  UpdateNodeRegistration,
} from '../components/TransactionTypes'

const GET_TRX_DATA = gql`
  query getTransaction($TrxID: String!) {
    transaction(TransactionID: $TrxID) {
      TransactionID
      Timestamp
      TransactionType
      TransactionTypeName
      BlockID
      Height
      Sender
      Recipient
      Confirmations
      FeeConversion
      SendMoney {
        Amount
        AmountConversion
      }
      NodeRegistration {
        NodePublicKey
        AccountAddress
        NodeAddress
        LockedBalance
        LockedBalanceConversion
        ProofOfOwnership {
          MessageBytes
          Signature
        }
      }
      UpdateNodeRegistration {
        NodePublicKey
        NodeAddress
        LockedBalance
        LockedBalanceConversion
        ProofOfOwnership {
          MessageBytes
          Signature
        }
      }
      RemoveNodeRegistration {
        NodePublicKey
      }
      ClaimNodeRegistration {
        NodePublicKey
        AccountAddress
        ProofOfOwnership {
          MessageBytes
          Signature
        }
      }
      SetupAccount {
        SetterAccountAddress
        RecipientAccountAddress
        Property
        Value
        MuchTime
      }
      RemoveAccount {
        SetterAccountAddress
        RecipientAccountAddress
        Property
        Value
      }
    }
  }
`

const TransactionType = ({ trx }) => {
  switch (trx.TransactionType) {
    case 1:
      return <SendMoney data={trx.SendMoney} />
    case 2:
      return <NodeRegistration data={trx.NodeRegistration} />
    case 258:
      return <UpdateNodeRegistration data={trx.UpdateNodeRegistration} />
    case 514:
      return <RemoveNodeRegistration data={trx.RemoveNodeRegistration} />
    case 770:
      return <ClaimNodeRegistration data={trx.ClaimNodeRegistration} />
    case 3:
      return <SetupAccount data={trx.SetupAccount} />
    case 259:
      return <RemoveAccount data={trx.RemoveAccount} />
    default:
      return null
  }
}

const Transaction = ({ match }) => {
  const { params } = match
  const { loading, data, error } = useQuery(GET_TRX_DATA, {
    variables: {
      TrxID: params.id,
    },
  })

  return (
    <DefaultLayout>
      {!!error && <NotFound />}
      {!!loading && <LoaderPage />}
      {!error && !loading && (
        <Container>
          <Row gutter={8}>
            <Col span={24}>
              <Row>
                <Col span={24}>
                  <h4>Transaction {data.transaction.TransactionID}</h4>
                </Col>
              </Row>
              <Card className="card-summary">
                <h4>Summary</h4>
                <DescItem
                  label="Transaction ID"
                  value={
                    <CopyToClipboard text={data.transaction.TransactionID} keyID="TransactionID" />
                  }
                />
                <DescItem
                  label="Timestamp"
                  value={moment(data.transaction.Timestamp).format('lll')}
                />
                <DescItem label="Transaction Type" value={data.transaction.TransactionTypeName} />
                <DescItem
                  label="Block ID"
                  value={<CopyToClipboard text={data.transaction.BlockID} keyID="BlockID" />}
                />
                <DescItem label="Height" value={data.transaction.Height} />
                <DescItem
                  label="Sender"
                  value={<CopyToClipboard text={data.transaction.Sender} keyID="sender" />}
                />
                <DescItem
                  label="Recipient"
                  value={<CopyToClipboard text={data.transaction.Recipient} keyID="recipient" />}
                />
                <DescItem label="Confirmations" value={data.transaction.Confirmations} />
                <DescItem
                  label="Fee"
                  value={
                    <NumberFormat
                      value={data.transaction.FeeConversion || 0}
                      displayType={'text'}
                      thousandSeparator={true}
                      suffix={' BCZ'}
                    />
                  }
                />
              </Card>
              <TransactionType trx={data.transaction} />
            </Col>
          </Row>
        </Container>
      )}
    </DefaultLayout>
  )
}

export default Transaction