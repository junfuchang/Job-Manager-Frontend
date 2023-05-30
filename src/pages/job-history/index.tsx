import { observer } from "mobx-react-lite";
import JobStudentList from "../job/job-student-list";
import { useRootStore } from "../../store/RootStore";

const JobHistory = () => {
  const { loginStore } = useRootStore();

  return (
    <>
      <JobStudentList
        companyId={loginStore?.getRoleInfo?.companyId}
        showSearch={true}
      />
    </>
  );
};

export default observer(JobHistory);
