import React from 'react'
import { Modal, Button } from 'antd'
import comingsoon from '../assets/images/comingsoon.svg'
import { useTranslation } from 'react-i18next'

const ComingSoon = ({ visible, title, onClose, content }) => {
  const { t } = useTranslation()
  return (
    <Modal
      title={title}
      visible={visible}
      onOk={onClose}
      onCancel={onClose}
      footer={[
        <Button type="primary" onClick={onClose}>
          {t('close')}
        </Button>,
      ]}
      centered
      width="auto"
      className="coming-soon-modal"
    >
      <div className="coming-soon">
        <img src={comingsoon} alt="Coming Soon" />
        <h1 className="py-3">{t('coming soon')}</h1>
      </div>
    </Modal>
  )
}

export default ComingSoon
