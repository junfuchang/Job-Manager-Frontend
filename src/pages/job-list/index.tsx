import { observer } from "mobx-react-lite";
import SubmitResume from "../submit-resume";

const JobList = () => {
  return (
    <>
      <SubmitResume isAdminPage={true} />
    </>
  );
};

export default observer(JobList);
