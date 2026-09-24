import css from './ModalApproveAction.module.css';
import { useMutation } from '@tanstack/react-query';
import { useQueryClient } from '@tanstack/react-query';
import { Button } from '../Button/Button';
import { logoutUser } from '@/app/lib/api/client/authApi';
import { useDispatch } from 'react-redux';
import { useRouter } from 'next/navigation';
import toast from 'react-hot-toast';
import { clearUser } from '@/app/lib/store/slices/authSlice';

type ModalApproveActionProps = {
  onClose: () => void;
};

export const ModalApproveAction = ({ onClose }: ModalApproveActionProps) => {
  const queryClient = useQueryClient();
  const dispatch = useDispatch();
  const router = useRouter();

  const logoutMutation = useMutation({
    mutationFn: logoutUser,

    onSuccess: () => {
      queryClient.clear();

      dispatch(clearUser());

      router.push('/');
    },

    onError: () => {
      toast.error('Failed to log out');
    },
  });

  return (
    <div className={css.modalWrapper}>
      <p className={css.paragraph}>Already leaving?</p>
      <div className={css.buttonsWrapper}>
        <Button
          type="button"
          className={css.confirm}
          onClick={() => logoutMutation.mutate()}
          disabled={logoutMutation.isPending}
        >
          Yes
        </Button>
        <Button
          type="button"
          className={css.cancelBtn}
          onClick={onClose}
          disabled={logoutMutation.isPending}
        >
          Cancel
        </Button>
      </div>
    </div>
  );
};
