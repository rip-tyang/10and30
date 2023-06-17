import { Authenticator } from '@aws-amplify/ui-react';
import { APIClass, Amplify, Auth, withSSRContext } from 'aws-amplify';
import Head from 'next/head';
import awsExports from '@/aws-exports';
import styles from '../styles/Home.module.css';
import { monthStr } from '@/utils/date';
import { UserData, isUserDataEmpty, PrimaryKey, getHighlightOrDefault} from '@/models/user_data';
import { GetServerSideProps, GetServerSidePropsContext } from 'next'
import { getCurrentUser } from '@/utils/user';
import { REDIRECT_HOME } from '@/utils/server_side_prop';

Amplify.configure({ ...awsExports, ssr: true });

interface UserPageProp {
    username: string,
    items: UserData,
}

export const getServerSideProps: GetServerSideProps = async (context: GetServerSidePropsContext) => {
    const SSR = withSSRContext(context);
    const currMonth = monthStr();
    const user = await getCurrentUser(SSR.Auth);

    if (user === null) {
        return REDIRECT_HOME;
    }

    const primary_key = {
        user_id: user.getUsername(),
        month: currMonth,
    } as PrimaryKey;

    const items = await getHighlightOrDefault(SSR.API, primary_key);

    return {
      props: {
        username: user.getUsername(),
        items,
      } as UserPageProp,
    }
}

export default function Home(props: UserPageProp) {
  return (
    <div className={styles.container}>
      <Head>
        <title>Amplify + Next.js</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <div className={styles.grid}>
          <div className={styles.card}>
            <h1>Hello {props.username}</h1>
            { 
                props.items.highlights.map((highlight, index) => (
                    (<div key={index}><span>{highlight.date}</span>{highlight.highlight}</div>)
                )) 
            }
          </div>
        </div>
      </main>
    </div>
  );
}