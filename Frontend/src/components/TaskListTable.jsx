import React from 'react'
import moment from 'moment';

const TaskListTable = ({tableData}) => {
    const getStatusBadgeColor = (status) => {
        switch (status) {
          case "Pending":
            return "bg-red-100 text-red-600 border border-red-200";
          case "In Progress":
            return "bg-violet-100 text-violet-600 border border-violet-200";
          case "Completed":
            return "bg-green-100 text-green-600 border border-green-200";
          default:
            return "bg-gray-100 text-gray-800 border border-gray-200";
        }
    };

    const getPriorityBadgeColor = (priority) => {
        switch (priority) {
          case "high":
            return "bg-red-100 text-red-600 border border-red-200";
          case "medium":
            return "bg-amber-100 text-amber-600 border border-yellow-200";
          case "low":
            return "bg-green-100 text-green-600 border border-green-200";
          default:
            return "bg-gray-100 text-gray-800 border border-gray-200";
        }
    };
  return (
    <div className='overflow-x-auto p-0 rounded-lg mt-3'>
      <table className='min-w-full'>
        <thead>
          <tr className='text-left'>
            <th className='py-3 px-4 text-gray-900 font-semibold text-[15px]'>Name</th>
            <th className='py-3 px-4 text-gray-900 font-semibold text-[15px]'>Status</th>
            <th className='py-3 px-4 text-gray-900 font-semibold text-[15px]'>Priority</th>
            <th className='py-3 px-4 text-gray-900 font-semibold text-[15px] hidden md:table-cell'>Created On</th>
          </tr>
        </thead>
        <tbody>
          {tableData.map((task) => (
            <tr key={task._id} className='border-t border-gray-200'>
              <td className='my-4 mx-4 text-gray-700 text-[14px] line-clamp-1 overflow-hidden'>{task.title}</td>
              <td className='py-4 px-4'>
                <span
                  className={`px-2 py-1 text-xs rounded inline-block ${getStatusBadgeColor(
                    task.status
                  )}`}
                >
                  {task.status}
                </span>
              </td>
              <td className='py-4 px-4'>
                <span
                  className={`px-2 py-1 text-xs rounded inline-block ${getPriorityBadgeColor(
                    task.priority
                  )}`}
                >
                  {task.priority}
                </span>
              </td>
              <td className='py-2 px-2 text-gray-700 text-[14px] text-nowrap hidden md:table-cell'>{task.createdAt ? moment(task.createdAt).format('Do MMM YYYY') : 'N/A'}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default TaskListTable