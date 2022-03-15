import { UserRegister } from '@/containers';
import { withoutAuth } from '@/HOC/withoutAuth';
import { NextPage } from 'next';

const Register: NextPage = () => <UserRegister />;

export default withoutAuth(Register);
