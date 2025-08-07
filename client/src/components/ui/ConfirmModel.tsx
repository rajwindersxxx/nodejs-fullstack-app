import { useModal } from "../../context/ModalContext";
import { PrimaryButton } from "./PrimaryButton";
import { SecondaryButton } from "./SecondaryButton";

interface props {
  confirmDelete?: () => void;
  message: string;
  type: "confirm" | "message";
}
const ConfirmModel = ({ confirmDelete, message, type }: props) => {
  const { closeModal } = useModal();
  return (
    <div className="flex flex-col gap-10 p-4">
      <h2 className="text-2xl font-semibold">{message}</h2>
      {type === "confirm" && (
        <div className="flex justify-center gap-10">
          <SecondaryButton onClick={closeModal}>Cancel</SecondaryButton>
          <PrimaryButton onClick={confirmDelete} style="danger">
            Yes
          </PrimaryButton>
        </div>
      )}
      {type === "message" && (
        <div className="flex justify-center">
          <PrimaryButton onClick={closeModal}>OK</PrimaryButton>
        </div>
      )}
    </div>
  );
};

export default ConfirmModel;
