import React from 'react'
import L from 'leaflet'
import gql from 'graphql-tag'
import { useQuery } from '@apollo/react-hooks'
import { useTranslation } from 'react-i18next'
import { Row, Col, Card, Spin } from 'antd'
import { Map, TileLayer, Marker, Popup } from 'react-leaflet'

const greenIcon = new L.Icon({
  iconUrl:
    'https://cdn.rawgit.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-green.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.7/images/marker-shadow.png',
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41],
})

const yellowIcon = new L.Icon({
  iconUrl:
    'https://cdn.rawgit.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-yellow.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.7/images/marker-shadow.png',
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41],
})

const redIcon = new L.Icon({
  iconUrl: 'https://cdn.rawgit.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-red.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.7/images/marker-shadow.png',
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41],
})

const GET_MAP_DATA = gql`
  query {
    maps {
      NodeID
      NodePublicKey
      OwnerAddress
      RegistryStatus
      CountryCode
      CountryName
      RegionCode
      RegionName
      City
      Latitude
      Longitude
      CountryFlagUrl
      NodeAddress {
        Address
        Port
      }
    }
  }
`

export default function MapNodes() {
  const { t } = useTranslation()
  const { loading, data } = useQuery(GET_MAP_DATA)

  return (
    <Card className="home-bottom" bordered={false}>
      <h5>
        <i className="bcz-calendar" />
        <strong>{t('Node Registration')}</strong>
      </h5>
      <Row>
        <Col span={24}>
          <div className="text-right">
            <ul className="map-legend">
              <li>
                <div className="green" /> {t('Registered')}
              </li>
              <li>
                <div className="yellow" /> {t('Pending')}
              </li>
              <li>
                <div className="red" /> {t('Deleted')}
              </li>
            </ul>
          </div>

          <div className="leaflet-container">
            <Map
              zoom={1}
              minZoom={1}
              maxZoom={10}
              // animate={true}
              // dragging={true}
              // zoomControl={true}
              // easeLinearity={0.35}
              style={{ zIndex: 0 }}
              // doubleClickZoom={true}
              // scrollWheelZoom={true}
              // attributionControl={true}
              center={[0, 0]}
            >
              <TileLayer
                attribution='&amp;copy <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
              />
              {loading ? (
                <Spin spinning={true} style={{ zIndex: 99 }} />
              ) : (
                data &&
                data.maps &&
                data.maps.map((item, i) => {
                  const icon =
                    item.RegistryStatus === 0
                      ? greenIcon
                      : item.RegistryStatus === 1
                      ? yellowIcon
                      : redIcon

                  return item.Latitude && item.Longitude ? (
                    <Marker
                      key={i}
                      icon={icon}
                      position={[item.Latitude.toString(), item.Longitude.toString()]}
                    >
                      <Popup>
                        <small>
                          <strong>
                            {item.NodeAddress.Address}:{item.NodeAddress.Port}
                          </strong>
                          <br />
                          Country: {item.CountryName}&nbsp;&nbsp;
                          <img src={item.CountryFlagUrl} alt="flag" style={{ height: '12px' }} />
                          <br />
                          City: {item.City}
                          <br />
                          Latitude: {item.Latitude}
                          <br />
                          Longitude: {item.Longitude}
                        </small>
                      </Popup>
                    </Marker>
                  ) : null
                })
              )}
            </Map>
          </div>
        </Col>
      </Row>
    </Card>
  )
}
