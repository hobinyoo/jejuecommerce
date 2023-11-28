import AutoSizeImage from '@components/cs/AutoSizeImage'
import MainHeader from '@components/cs/MainHeader'

const Agree = () => {
  return (
    <div>
      <MainHeader uid={''} />
      <AutoSizeImage src={`/images/agree_1.png`} full />
      <AutoSizeImage src={`/images/agree_2.png`} full />
    </div>
  )
}

export default Agree
