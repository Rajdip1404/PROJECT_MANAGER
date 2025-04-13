import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import DashboardLayout from "../../components/layouts/DashboardLayout";
import axiosInstance from "../../utils/axiosInstance";
import { API_PATHS } from "../../utils/apiPaths";
import toast from "react-hot-toast";
import { PRIORITY_DATA } from "../../utils/data";
import moment from "moment";
import { LuTrash2 } from "react-icons/lu";
import SelectDropdown from "../../components/Inputs/SelectDropdown";
import SelectUsers from "../../components/Inputs/SelectUsers";
import TodoListInput from "../../components/Inputs/TodoListInput";
import AddAttachmentsInput from "../../components/Inputs/AddAttachmentsInput";
import Modal from "../../components/Modal";
import DeleteAlert from "../../components/DeleteAlert";

const CreateTask = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { taskId } = location.state || {};

  const [taskData, setTaskData] = useState({
    title: "",
    description: "",
    dueDate: "",
    priority: "",
    assignedTo: [],
    todoCheckList: [],
    attachments: [],
  });

  const [currentTask, setCurrentTask] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const [openDeleteAlert, setOpenDeleteAlert] = useState(false);

  const handleValueChange = (key, value) => {
    setTaskData((prevData) => ({
      ...prevData,
      [key]: value,
    }));
  };

  const clearData = () => {
    setTaskData({
      title: "",
      description: "",
      dueDate: null,
      priority: "",
      assignedTo: [],
      todoCheckList: [],
      attachments: [],
    });
  };

  // Create Task
  const createTask = async () => {
    try {
      setLoading(true);

      const todoList = taskData.todoCheckList.map((item, index) => ({
        text: item,
        completed: false,
      }));

      const response = await axiosInstance.post(API_PATHS.TASKS.CREATE_TASK, {
        ...taskData,
        dueDate: new Date(taskData.dueDate).toISOString(),
        todoCheckList: todoList,
      });
      toast.success("Task created successfully");
      console.log(response.data.message);
      clearData();
      navigate("/admin/tasks");
    } catch (error) {
      setError(error.response.data.message);
    } finally {
      setLoading(false);
    }
  };

  const updateTask = async () => {
    setLoading(true);
    try {
      const todoList = taskData.todoCheckList.map((item, index) => {
        const prevTodoCheckList = currentTask?.todoCheckList || [];
        const matchedTask = prevTodoCheckList.find(
          (task) => task.text === item
        );
        return {
          text: item,
          completed: matchedTask ? matchedTask?.completed : false,
        };
      });

      const response = await axiosInstance.put(
        API_PATHS.TASKS.UPDATE_TASK(taskId._id),
        {
          ...taskData,
          dueDate: new Date(taskData.dueDate).toISOString(),
          todoCheckList: todoList,
        }
      );
      toast.success("Task updated successfully");
      clearData();
      navigate("/admin/tasks");
    } catch (error) {
      console.error("Error updating task:", error);
      setError(error.response.data.message);
    } finally {
      setLoading(false);
    }
  };

  const deleteTask = async () => {
    try {
      const response = await axiosInstance.delete(
        API_PATHS.TASKS.DELETE_TASK(taskId._id)
      );
      setOpenDeleteAlert(false);
      toast.success("Task deleted successfully");
      console.log(response.data.message);
      navigate("/admin/tasks");
    } catch (error) {
      console.error("Error deleting task:", error);
    }
  };

  const getTaskDetailsByID = async () => {
    try {
      const response = await axiosInstance.get(
        API_PATHS.TASKS.GET_TASK_BY_ID(taskId._id)
      );
      if (response.data) {
        const taskInfo = response.data;
        setCurrentTask(taskInfo);
        setTaskData({
          title: taskInfo.title,
          description: taskInfo.description,
          dueDate: taskInfo.dueDate
            ? moment(taskInfo.dueDate).format("YYYY-MM-DD")
            : null,
          priority: taskInfo.priority,
          assignedTo: taskInfo?.assignedTo?.map((item) => item._id).flat() || [],
          todoCheckList:
            taskInfo?.todoCheckList?.map((item) => item.text) || [],
          attachments: taskInfo?.attachments || [],
        });
      }
    } catch (error) {
      console.error("Error fetching task: ", error);
    }
  };

  const handleSubmit = async () => {
    setError(null);
    if (!taskData.title.trim()) {
      setError("Please enter task title");
      return;
    }

    if (!taskData.description.trim()) {
      setError("Please enter task description");
      return;
    }

    if (!taskData.dueDate) {
      setError("Please select due date");
      return;
    }

    if (taskData.dueDate < new Date()) {
      setError("Due date cannot be in the past");
      return;
    }

    if (taskData.assignedTo?.length === 0) {
      setError("Task not assigned to any user");
      return;
    }

    if (taskData.todoCheckList?.length === 0) {
      setError("Add atleast 1 todo task");
      return;
    }

    if (taskId) {
      updateTask();
      return;
    }

    createTask();
  };

  useEffect(() => {
    if (taskId) {
      // console.log(location.state.taskId._id);
      getTaskDetailsByID();
    }
    return () => {};
  }, [taskId]);

  return (
    <DashboardLayout activeMenu="Create Task">
      <div className="mt-5">
        <div className="grid grid-cols-1 md:grid-cols-4 mt-4">
          <div className="form-card col-span-3">
            <div className="flex items-center justify-between">
              <h2 className="text-xl md:text-xl font-medium">
                {taskId ? "Update Task" : "Create Task"}
              </h2>
              {taskId && (
                <button
                  className="flex items-center gap-1.5 text-[13px] text-red-500 font-medium bg-rose-50 rounded px-2 py-1 border border-rose-100 hover:border-rose-300 cursor-pointer"
                  onClick={() => setOpenDeleteAlert(true)}
                >
                  <LuTrash2 className="text-base" /> Delete
                </button>
              )}
            </div>
            <div className="mt-4">
              <label className="text-xs font-medium text-slate-700">
                Task Title
              </label>

              <input
                placeholder="Create App UI"
                className="form-input"
                value={taskData.title}
                onChange={({ target }) =>
                  handleValueChange("title", target.value)
                }
              />
            </div>

            <div className="mt-3">
              <label className="text-xs font-medium text-slate-700">
                Description
              </label>

              <textarea
                placeholder="Describe "
                className="form-input"
                rows={4}
                value={taskData.description}
                onChange={({ target }) =>
                  handleValueChange("description", target.value)
                }
              />
            </div>

            <div className="grid grid-cols-12 gap-4 mt-2">
              <div className="col-span-6 md:col-span-4">
                <label className="text-xs font-medium text-slate-700">
                  Priority
                </label>

                <SelectDropdown
                  options={PRIORITY_DATA}
                  value={taskData.priority}
                  onChange={(value) => handleValueChange("priority", value)}
                  placeholder="Select Priority"
                />
              </div>

              <div className="col-span-6 md:col-span-4">
                <label className="text-xs font-medium text-slate-700">
                  Due Date
                </label>
                <input
                  type="date"
                  className="form-input"
                  placeholder="Create App UI"
                  value={taskData.dueDate}
                  onChange={({ target }) =>
                    handleValueChange("dueDate", target.value)
                  }
                />
              </div>

              <div className="col-span-12 md:col-span-3">
                <label className="text-xs font-medium text-slate-700">
                  Assign To
                </label>

                <SelectUsers
                  selectedUsers={taskData.assignedTo}
                  setSelectedUsers={(value) =>
                    handleValueChange("assignedTo", value)
                  }
                />
              </div>
            </div>

            <div className="mt-3">
              <label className="text-xs font-medium text-slate-700">
                TODO Checklist
              </label>

              <TodoListInput
                todoList={taskData?.todoCheckList}
                setTodoList={(value) =>
                  handleValueChange("todoCheckList", value)
                }
              />
            </div>

            <div className="mt-3">
              <label className="text-xs font-medium text-slate-700">
                Attachments
              </label>

              <AddAttachmentsInput
                attachments={taskData?.attachments}
                setAttachments={(value) =>
                  handleValueChange("attachments", value)
                }
              />
            </div>

            {error && (
              <p className="text-xs font-medium text-red-500 mt-5">{error}</p>
            )}

            <div className="flex justify-end mt-7">
              <button
                className="add-btn"
                onClick={handleSubmit}
                disabled={loading}
              >
                {taskId ? "UPDATE TASK" : "CREATE TASK"}
              </button>
            </div>
          </div>
        </div>
      </div>

      <Modal isOpen={openDeleteAlert} onClose={() => setOpenDeleteAlert(false)} title="Delete Task">
        <DeleteAlert content="Are you sure you want to delete this task?" onDelete={deleteTask}/>
      </Modal>
    </DashboardLayout>
  );
};

export default CreateTask;
