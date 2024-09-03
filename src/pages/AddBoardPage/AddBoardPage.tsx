import RegisterForm from "@/components/Layout/RegisterForm/RegisterForm";
import { fields } from "@/components/Layout/RegisterForm/registerConfig";

const AddBoardPage = () => {
  const formFields = fields;

  return (
    <div>
      <RegisterForm
        fields={formFields}
        titleText={"게시글 쓰기"}
        href={"/boards"}
      />
    </div>
  );
};

export default AddBoardPage;
