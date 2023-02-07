import styled from '@emotion/styled'
import IconStar from '../public/Star.svg'
import IconStarNone from '../public/StarNone.svg'
import { CommentItemType } from 'pages/products/[id]'
import { format } from 'date-fns'
import CustomEditor from './Editor'
import { convertFromRaw, EditorState } from 'draft-js'
import AutoSizeImage from './AutoSizeImage'

export default function CommentItem({ item }: { item: CommentItemType }) {
  return (
    <Wrapper>
      <div>
        <div style={{ display: 'flex ' }}>
          <div style={{ display: 'flex ', flexDirection: 'column' }}>
            <div style={{ display: 'flex' }}>
              {Array.from({ length: 5 }).map((_, idx) => {
                return (
                  <div key={idx}>
                    {idx < item.rate ? <IconStar /> : <IconStarNone />}
                  </div>
                )
              })}
            </div>
            <span className="text-zinc-300 text-xs">
              {item.price.toLocaleString('ko-kr')} 원 *{item.quantity} 개
              {item.amount.toLocaleString('ko-kr')} 원
            </span>
          </div>

          <p className="text-zinc-500 ml-auto">
            {format(new Date(item.updatedAt), 'yyyy년 M월 d일')}
          </p>
        </div>
        <CustomEditor
          readOnly
          editorState={EditorState.createWithContent(
            convertFromRaw(JSON.parse(item.contents ?? ''))
          )}
          noPadding
        />
      </div>
      <div style={{ display: 'flex' }}>
        {item.images &&
          item.images
            ?.split(',')
            .map((image, idx) => (
              <AutoSizeImage key={idx} src={image} size={150} />
            ))}
      </div>
    </Wrapper>
  )
}

const Wrapper = styled.div`
  border: 1px solid black;
  border-radius: 8px;
  padding: 8px;
`
