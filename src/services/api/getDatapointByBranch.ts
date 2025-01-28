import customAxios from '../customAxios';

type getDatapointByBranchType = {
  branchId: number;
};

export const getDatapointByBranch = async (
  branchId: getDatapointByBranchType,
) => {
  if (!branchId) {
    console.error('Eksik parametre girişi yapıldı!');
  }

  try {
    const response = await customAxios(`datapoint/branchlist/${branchId}`);
    console.log(response.data);
    return response.data;
  } catch (error: any) {
    const errors = error.response;
    return console.log(errors);
  }
};
