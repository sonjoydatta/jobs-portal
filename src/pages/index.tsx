import { UserSignIn } from '@/containers';
import { withoutAuth } from '@/HOC/withoutAuth';
import { NextPage } from 'next';

const Home: NextPage = () => <UserSignIn />;

export default withoutAuth(Home);
