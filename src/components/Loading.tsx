import { modalOverlay } from 'styles/globalStyle'
import AutoSizeImage from './cs/AutoSizeImage'

const Loading = () => {
  return (
    <div css={modalOverlay}>
      <AutoSizeImage src={'/loading.gif'} width={3} height={3} />
    </div>
  )
}
export default Loading
