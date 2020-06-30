import React from 'react'
import { Row, Col, Card } from 'antd'
import { useQuery } from '@apollo/react-hooks'
import moment from 'moment'
import gql from 'graphql-tag'
import NumberFormat from 'react-number-format'
import { useTranslation } from 'react-i18next'
import { Link } from 'react-router-dom'

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
  MultiSignature,
  EscrowApproval,
  EscrowTransaction,
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
      FeeConversion
      SendMoney {
        Amount
        AmountConversion
      }
      NodeRegistration {
        NodePublicKey
        AccountAddress
        NodeAddress {
          Address
          Port
        }
        LockedBalance
        LockedBalanceConversion
        ProofOfOwnership {
          MessageBytes
          Signature
        }
      }
      UpdateNodeRegistration {
        NodePublicKey
        NodeAddress {
          Address
          Port
        }
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
      }
      RemoveAccount {
        SetterAccountAddress
        RecipientAccountAddress
        Property
        Value
      }
      MultiSignature {
        MultiSignatureInfo {
          MinimumSignatures
          Nonce
          Addresses
          MultisigAddress
          BlockHeight
          Latest
        }
        UnsignedTransactionBytes
        SignatureInfo {
          TransactionHash
          Signatures {
            Address
            Signature
          }
        }
      }
      TransactionHash
      MultisigChild
      ApprovalEscrow {
        TransactionID
        Approval
      }
      Escrow {
        SenderAddress
        RecipientAddress
        ApproverAddress
        AmountConversion
        CommissionConversion
        Timeout
        Status
        BlockHeight
        Latest
        Instruction
      }
    }
  }
`

const TransactionType = ({ trx }) => {
  switch (trx.TransactionType) {
    case 1:
      return (
        <>
          <SendMoney data={trx.SendMoney} />
          {trx.Escrow && <EscrowTransaction data={trx.Escrow} />}
          {trx.MultisigChild && <MultiSignature data={trx.MultiSignature} />}
        </>
      )
    case 4:
      return (
        <>
          <EscrowApproval data={trx.ApprovalEscrow} />
          <EscrowTransaction data={trx.Escrow} blockID={trx.BlockID} />
        </>
      )
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
    case 5:
      return <MultiSignature data={trx.MultiSignature} />
    default:
      return null
  }
}

const Transaction = ({ match }) => {
  const { t } = useTranslation()
  const { params } = match
  const { loading, data, error } = useQuery(GET_TRX_DATA, {
    variables: {
      TrxID: params.id,
    },
  })

  return (
    <>
      {!!error && <NotFound />}
      {!!loading && <LoaderPage />}
      {!error && !loading && (
        <Container>
          <Row className="transaction-row">
            <Col span={24}>
              <Row>
                <Col span={24}>
                  <h4 className="truncate">
                    {t('Transaction')} {data.transaction.TransactionID}
                  </h4>
                </Col>
              </Row>
              <Card className="transaction-card" bordered={false}>
                <h4 className="transaction-card-title">{t('Summary')}</h4>
                <DescItem
                  label={t('Transaction ID')}
                  value={
                    <CopyToClipboard text={data.transaction.TransactionID} keyID="TransactionID" />
                  }
                />
                <DescItem
                  label={t('Timestamp')}
                  value={moment(data.transaction.Timestamp).format('lll')}
                />
                <DescItem label="Transaction Type" value={data.transaction.TransactionTypeName} />
                <DescItem
                  label={t('Block ID')}
                  value={
                    <Link to={`/blocks/${data.transaction.BlockID}`}>
                      {data.transaction.BlockID}
                    </Link>
                  }
                />
                <DescItem
                  label="Height"
                  value={
                    <Link to={`/blocks/${data.transaction.BlockID}`}>
                      {data.transaction.Height}
                    </Link>
                  }
                />
                <DescItem
                  label={t('Sender')}
                  value={
                    <Link to={`/accounts/${data.transaction.Sender}`}>
                      {data.transaction.Sender}
                    </Link>
                  }
                />
                <DescItem
                  label={t('Recipient')}
                  value={
                    <Link to={`/accounts/${data.transaction.Recipient}`}>
                      {data.transaction.Recipient}
                    </Link>
                  }
                />
                {/* <DescItem label={t('Confirmations')} value={data.transaction.Confirmations} /> */}
                <DescItem
                  label={t('Fees')}
                  value={
                    <NumberFormat
                      value={data.transaction.FeeConversion || 0}
                      displayType={'text'}
                      thousandSeparator={true}
                      suffix={' ZBC'}
                    />
                  }
                />
                {data.transaction.MultisigChild && (
                  <DescItem
                    label={t('Transaction Hash')}
                    value={data.transaction.TransactionHash}
                  />
                )}
              </Card>
              <TransactionType trx={data.transaction} />
            </Col>
          </Row>
        </Container>
      )}
    </>
  )
}

export default Transaction
