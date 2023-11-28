import AutoSizeImage from '@components/cs/AutoSizeImage'
import MainHeader from '@components/cs/MainHeader'

const Service = () => {
  return (
    <div>
      <MainHeader uid={''} />
      <AutoSizeImage src={`/images/service_1.png`} full />
      <AutoSizeImage src={`/images/service_2.png`} full />
      <AutoSizeImage src={`/images/service_3.png`} full />
      <AutoSizeImage src={`/images/service_4.png`} full />
      <AutoSizeImage src={`/images/service_5.png`} full />
      <AutoSizeImage src={`/images/service_6.png`} full />
      <AutoSizeImage src={`/images/service_7.png`} full />
    </div>
  )
}

export default Service
