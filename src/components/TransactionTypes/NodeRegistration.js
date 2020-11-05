import React from 'react'
import { Card } from 'antd'
import { Link } from 'react-router-dom'
import NumberFormat from 'react-number-format'
import DescItem from '../DescItem'
import { useTranslation } from 'react-i18next'

const NodeRegistration = ({ data }) => {
  const { t } = useTranslation()
  return (
    <Card className="transaction-card">
      <h4 className="transaction-card-title page-title">{t('node registration')}</h4>
      {/* <DescItem
        label={t('node address')}
        style={{ display: 'none' }}
        value={data?.NodeAddress?.Address}
      /> */}
      <DescItem
        label={t('account address')}
        style={{ display: 'none' }}
        value={<Link to={`/accounts/${data.AccountAddress}`}>{data.AccountAddress}</Link>}
        textClassName="monospace-text"
      />
      <DescItem
        label={t('node public key')}
        text={t(
          'a string of letters and numbers that are used to receive amount of zoobc. works similar to a traditional bank account number and can be shared publicly with others'
        )}
        value={
          <Link to={`/nodes/${data.NodePublicKeyFormatted}`}>{data.NodePublicKeyFormatted}</Link>
        }
        textClassName="monospace-text"
      />
      <DescItem
        label={t('locked balance')}
        text={t('amount of zoobc to be locked as security money for node')}
        value={
          <NumberFormat
            value={data.LockedBalanceConversion || 0}
            displayType={'text'}
            thousandSeparator={true}
            suffix={' ZBC'}
            className="monospace-text"
          />
        }
      />
      <DescItem
        label={t('poow message bytes')}
        style={{ display: 'none' }}
        value={data.ProofOfOwnership && data.ProofOfOwnership.MessageBytes}
        textClassName="monospace-text"
      />
      <DescItem
        label={t('poow signature')}
        style={{ display: 'none' }}
        value={data.ProofOfOwnership && data.ProofOfOwnership.Signature}
        textClassName="monospace-text"
      />
    </Card>
  )
}

export default NodeRegistration
