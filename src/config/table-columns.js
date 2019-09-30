import React from 'react'
import { Link } from 'react-router-dom'
import moment from 'moment'
import NumberFormat from 'react-number-format'

import { shortenHash } from '../utils/shorten'

export const blockHomeColumns = [
  {
    title: 'Height',
    dataIndex: 'Height',
    key: 'Height',
    render(text, record) {
      return <Link to={`/blocks/${record.BlockID}`}>{text}</Link>
    },
  },
  {
    title: 'Timestamp',
    dataIndex: 'Timestamp',
    key: 'Timestamp',
    render(text) {
      return moment(text).format('lll')
    },
  },
  {
    title: 'Blocksmith',
    dataIndex: 'BlocksmithID',
    key: 'BlocksmithID',
    render(text) {
      return shortenHash(text, 30)
    },
  },
]

export const trxHomeColumns = [
  {
    title: 'Transactions Id',
    dataIndex: 'TransactionID',
    key: 'TransactionID',
    render(text) {
      return <Link to={`/transactions/${text}`}>{text}</Link>
    },
  },
  {
    title: 'Timestamp',
    dataIndex: 'Timestamp',
    key: 'Timestamp',
    render(text) {
      return moment(text).format('lll')
    },
  },
  {
    title: 'Fee',
    dataIndex: 'Fee',
    key: 'Fee',
    render(text) {
      return (
        <NumberFormat
          value={text || 0}
          displayType={'text'}
          thousandSeparator={true}
          suffix={' BCZ'}
        />
      )
    },
  },
]

export const accountColumns = [
  {
    title: 'Address',
    dataIndex: 'AccountAddress',
    key: 'AccountAddress',
    render(text) {
      return <Link to={`/accounts/${text}`}>{shortenHash(text, 30)}</Link>
    },
  },
  {
    title: 'Balance',
    dataIndex: 'Balance',
    key: 'Balance',
    render(text) {
      return (
        <NumberFormat
          value={text || 0}
          displayType={'text'}
          thousandSeparator={true}
          suffix={' BCZ'}
        />
      )
    },
  },
  {
    title: 'Last Active',
    dataIndex: 'LastActive',
    key: 'LastActive',
    render(text) {
      return !!text ? text : '-'
    },
  },
  {
    title: 'Rewards',
    dataIndex: 'TotalRewards',
    key: 'TotalRewards',
    render(text) {
      return (
        <NumberFormat
          value={text || 0}
          displayType={'text'}
          thousandSeparator={true}
          suffix={' BCZ'}
        />
      )
    },
  },
  {
    title: 'Fees',
    dataIndex: 'TotalFeesPaid',
    key: 'TotalFeesPaid',
    render(text) {
      return (
        <NumberFormat
          value={text || 0}
          displayType={'text'}
          thousandSeparator={true}
          suffix={' BCZ'}
        />
      )
    },
  },
]

export const blockColumns = [
  {
    title: 'Block ID',
    dataIndex: 'BlockID',
    key: 'BlockID',
    render(text) {
      return <Link to={`/blocks/${text}`}>{text}</Link>
    },
  },
  {
    title: 'Height',
    dataIndex: 'Height',
    key: 'Height',
    render(text, record) {
      return <Link to={`/blocks/${record.BlockID}`}>{text}</Link>
    },
  },
  {
    title: 'Timestamp',
    dataIndex: 'Timestamp',
    key: 'Timestamp',
    render(text) {
      return moment(text).format('lll')
    },
  },
  {
    title: 'Blocksmith',
    dataIndex: 'BlocksmithID',
    key: 'BlocksmithID',
    render(text) {
      return shortenHash(text, 30)
    },
  },
  {
    title: 'Fee',
    dataIndex: 'TotalFee',
    key: 'TotalFee',
    render(text) {
      return (
        <NumberFormat
          value={text || 0}
          displayType={'text'}
          thousandSeparator={true}
          suffix={' BCZ'}
        />
      )
    },
  },
  {
    title: 'Rewards',
    dataIndex: 'TotalRewards',
    key: 'TotalRewards',
    render(text) {
      return (
        <NumberFormat
          value={text || 0}
          displayType={'text'}
          thousandSeparator={true}
          suffix={' BCZ'}
        />
      )
    },
  },
]

export const transactionColumns = [
  {
    title: 'Transaction ID',
    dataIndex: 'TransactionID',
    key: 'TransactionID',
    render(text) {
      return <Link to={`/transactions/${text}`}>{text}</Link>
    },
  },
  {
    title: 'Timestamp',
    dataIndex: 'Timestamp',
    key: 'Timestamp',
    render(text) {
      return moment(text).format('lll')
    },
  },
  {
    title: 'Type',
    dataIndex: 'TransactionType',
    key: 'TransactionType',
  },
  {
    title: 'Sender',
    dataIndex: 'Sender',
    key: 'Sender',
    render(text) {
      return <Link to={`/accounts/${text}`}>{shortenHash(text, 30)}</Link>
    },
  },
  {
    title: 'Recipient',
    dataIndex: 'Recipient',
    key: 'Recipient',
    render(text) {
      return <Link to={`/accounts/${text}`}>{shortenHash(text, 30)}</Link>
    },
  },
  {
    title: 'Confirmations',
    dataIndex: 'Confirmations',
    key: 'Confirmations',
  },
  {
    title: 'Fees',
    dataIndex: 'Fee',
    key: 'Fee',
    render(text) {
      return (
        <NumberFormat
          value={text || 0}
          displayType={'text'}
          thousandSeparator={true}
          suffix={' BCZ'}
        />
      )
    },
  },
]

export const nodeColumns = [
  {
    title: 'Node Public Key',
    dataIndex: 'NodePublicKey',
    key: 'NodePublicKey',
    render(text) {
      return <Link to={`/nodes/${text}`}>{shortenHash(text, 30)}</Link>
    },
  },
  {
    title: 'Owner Address',
    dataIndex: 'OwnerAddress',
    key: 'OwnerAddress',
    render(text) {
      return <Link to={`/accounts/${text}`}>{shortenHash(text, 30)}</Link>
    },
  },
  {
    title: 'Node Address',
    dataIndex: 'NodeAddress',
    key: 'NodeAddress',
    render(text) {
      return !!text ? text : '-'
    },
  },
  {
    title: 'Locked Funds',
    dataIndex: 'LockedFunds',
    key: 'LockedFunds',
    render(text) {
      return (
        <NumberFormat
          value={text || 0}
          displayType={'text'}
          thousandSeparator={true}
          suffix={' BCZ'}
        />
      )
    },
  },
  {
    title: 'Registry Status',
    dataIndex: 'RegistryStatus',
    key: 'RegistryStatus',
    render(text) {
      return !!text.toString() ? (text.toString() === 'true' ? 'Registered' : 'In Queue') : '-'
    },
  },
  {
    title: 'Participation Score',
    dataIndex: 'ParticipationScore',
    key: 'ParticipationScore',
    render(text) {
      return !!text ? text : '-'
    },
  },
]
