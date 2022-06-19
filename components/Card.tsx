import React from 'react'
import { useRecoilState, useSetRecoilState } from 'recoil'
import _ from 'lodash'

import { modalState } from '../atoms/modal'
import Pencil from './assets/Pencil'
import Star from './assets/Star'
import ICard from '../types/Card'
import { CardListState } from '../atoms/card'

const Card: React.FunctionComponent<ICard> = (props) => {
  const { id, title, content, url, date, isMark } = props
  const [cardList, setCardList] = useRecoilState(CardListState)
  const setModal = useSetRecoilState(modalState)
  const handlePencilIcon = () => {
    setModal({
      id: id,
      state: true,
    })
  }
  const handleStarIcon = () => {
    const index = _.findIndex(cardList, {
      id: id,
    })
    setCardList(() => {
      return [
        ...cardList.slice(0, index),
        {
          ...props,
          isMark: !isMark,
        },
        ...cardList.slice(index + 1, cardList.length),
      ]
    })
  }
  return (
    <div className="mx-auto container">
      <div className="rounded">
        <div className="w-full h-72 flex flex-col justify-between bg-gray-800 border-gray-700 rounded-lg border  mb-6 py-5 px-4">
          <a target="_blank" href={url} rel="noreferrer">
            <div>
              <h3 className="text-gray-100 leading-7 font-semibold w-11/12">
                {title}
              </h3>
            </div>
            <div>
              <p className="text-sm break-words my-2">{content}</p>
              <p className="text-sm break-words my-2 text-gray-600">
                {url.length > 150 ? `${url.slice(0, 150)}...` : url}
              </p>
            </div>
          </a>
          <div>
            <div
              className="w-7 h-7 mb-2 rounded-full bg-gray-100 text-gray-800 flexCenter hover:cursor-pointer"
              onClick={handleStarIcon}
            >
              <Star isMark={isMark} />
            </div>
            <div className="flex items-center justify-between text-gray-800 dark:text-gray-100">
              <p className="text-sm">{date}</p>
              <div
                className="p-1 rounded-full text-gray-700 bg-gray-100 cursor-pointer"
                onClick={handlePencilIcon}
              >
                <Pencil />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default React.memo(Card)
