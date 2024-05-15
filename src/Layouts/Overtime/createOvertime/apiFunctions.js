import client from "../../../global/client";

export const getDataTask = async (id, currentUserId, setOptTask) => {
  const res = await client.requestAPI({
    method: "GET",
    endpoint: `/ol/taskProject?projectId=${id}&userId=${currentUserId}&search=`,
  });

  const data = res.data.map((item) => ({
    backlogId: parseInt(item.id),
    taskName: item.attributes.taskName,
    actualEffort: item.attributes.actualEffort,
  }));
  setOptTask(data);
};

export const getDataProject = async (currentUserId, setOptProject) => {
  const res = await client.requestAPI({
    method: "GET",
    endpoint: `/ol/projectTypeList?userId=${currentUserId}&search=`,
  });
  const data = res.data.map((item) => ({
    id: parseInt(item.id),
    name: item.attributes.projectName,
  }));
  setOptProject(data);
};

export const getDataStatus = async (setOptStatus) => {
  const res = await client.requestAPI({
    method: "GET",
    endpoint: `/ol/status?search=`,
  });
  const data = res.data.map((item) => ({
    id: parseInt(item.id),
    status: item.attributes.name,
  }));
  setOptStatus(data);
};
