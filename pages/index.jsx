import Head from 'next/head';
import Sidebar from '../components/Sidebar/Sidebar';
import Feed from '../components/Feed';
import Login from '../components/Login';
import Modal from '../components/Modal';
import Widget from '../components/Widget';
import { getProviders, getSession, useSession } from "next-auth/react";
import { useRecoilState } from "recoil";
import { modalState } from '../atoms/modalAtoms';

const Home = ({ trendingResults, followResults, providers }) => {
  const { data: session } = useSession();
  const [isOpen, setIsOpen] = useRecoilState(modalState);

  if (!session) return <Login providers={providers} />;
  // console.log(session);

  return (
    <div>
      <Head>
        <title>Twitter - Alpha</title>
        <link rel='icon' href='/favicon.ico' />
      </Head>

      <main className='bg-black min-h-screen flex max-w-[1500px] mx-auto'>
        <Sidebar />
        <Feed />
        <Widget
          trendingResults={trendingResults}
          followResults={followResults}
        />
        {isOpen && <Modal />}
      </main>
    </div>
  );
};

export default Home;

export async function getServerSideProps(context) {
  // const trendingResults = await fetch("https://www.jsonkeeper.com/b/NKEV").then(
  //   (res) => res.json()
  // );
  const trendingResults = [
    {
      'heading': 'T20 World Cup 2021 * Live',
      'description': 'NZvAUS: New Zealand and Australia clash in the T20 World Cup final',
      'img': 'https://rb.gy/d9yjtu',
      'tags': ['#T20WorldCupFinal, ', 'Kane Williamson']
    },
    {
      'heading': 'Trending in United Arab Emirates',
      'description': '#earthquake',
      'img': 'https://rb.gy/jvuy4v',
      'tags': ['#DubiaAirshow, ', 'gessdubai']
    },
    {
      'heading': 'Trending in Digital Creators',
      'description': 'tubbo and quackity',
      'img': '',
      'tags': ['QUACKITY AND TUBBO,']
    },
  ];

  // const followResults = await fetch("https://www.jsonkeeper.com/b/WWMJ").then(
  //   (res) => res.json()
  // );
  const followResults = [
    {
      'userName': 'T20 World Cup 2021 * Live',
      'userImg': 'https://rb.gy/d9yjtu',
      'tag': ['#T20WorldCupFinal, ', 'Kane Williamson']
    },
    {
      'heading': 'Trending in United Arab Emirates',
      'userImg': 'https://rb.gy/jvuy4v',
      'tag': ['#DubiaAirshow, ', 'gessdubai']
    },
    {
      'heading': 'Trending in Digital Creators',
      'userImg': 'https://rb.gy/jvuy4v',
      'tag': ['QUACKITY AND TUBBO,']
    },
  ];
  const providers = await getProviders();
  const session = await getSession(context);

  return {
    props: {
      trendingResults,
      followResults,
      providers,
      session,
    },
  };
}
