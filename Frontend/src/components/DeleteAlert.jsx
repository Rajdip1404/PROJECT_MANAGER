import React from 'react'

const DeleteAlert = ({content, onDelete}) => {
  return (
    <div>
        <p className='text-sm'>{content}</p>
        <div className='flex justify-end mt-6'>
          <button
            type='button'
            onClick={onDelete}
             className='flex items-center justify-center gap-1.5 text-xs md:text-sm font-medium text-red-500 whitespace-nowrap bg-rose-50 border border-rose-100 rounded-lg px-3 py-1.5 cursor-pointer hover:text-gray-100 hover:bg-rose-500 hover:shadow-sm hover:shadow-rose-300/50 hover:transition ease-in-out duration-100 hover:cursor-pointer'
          >
            Delete  
          </button>  
        </div>
    </div>
  )
}

export default DeleteAlert