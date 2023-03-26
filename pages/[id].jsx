// THIS IS A DYNAMIC PAGE ALSO CALLED WILD CARD
import {
    collection,
    doc,
    onSnapshot,
    orderBy,
    query,
} from "@firebase/firestore";
import { getProviders, getSession, useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import { useRecoilState } from "recoil";
import Head from 'next/head';
import Modal from '../components/Modal';
import Post from '../components/Post';
import Login from '../components/Login';
import Comment from '../components/Comment';
import Sidebar from "../components/Sidebar/Sidebar";
import Widget from "../components/Widget";
import { modalState } from '../atoms/modalAtoms';
import { useRouter } from 'next/router';
import { db } from "../firebase";
import { ArrowLeftIcon } from "@heroicons/react/solid";

const PostPage = ({ trendingResults, followResults, providers }) => {
    const { data: session } = useSession();
    const [isOpen, setIsOpen] = useRecoilState(modalState);
    const [post, setPost] = useState();
    const [comments, setComments] = useState([]);
    const router = useRouter();
    const { id } = router.query;

    useEffect(
        () =>
            onSnapshot(doc(db, "posts", id), (snapshot) => {
                setPost(snapshot.data());
            }),
        [db]
    );

    useEffect(
        () =>
            onSnapshot(
                query(
                    collection(db, "posts", id, "comments"),
                    orderBy("timestamp", "desc")
                ),
                (snapshot) => setComments(snapshot.docs)
            ),
        [db, id]
    );

    if (!session) return <Login providers={providers} />;

    return (
        <div className=''>
            <Head>
                <title>
                    {post?.username} on Twitter: "{post?.text}"
                </title>
                <link rel='icon' href='/favicon.ico' />
            </Head>

            <main className='bg-black min-h-screen flex max-w-[1500px] mx-auto'>
                <Sidebar />
                <div className="flex-grow border-l border-r border-gray-700 max-w-2xl sm:ml-[73px] xl:ml-[370px]">
                    <div className="flex items-center px-1.5 py-2 border-b border-r border-gray-700 text-[#d9d9d9] font-semibold text-xl gap-x-4 sticky top-0 z-50 bg-black">
                        <div
                            className="hoverAnimation w-9 h-9 flex items-center justify-center xl:px-0"
                            onClick={() => router.push("/")}
                        >
                            <ArrowLeftIcon className="h-5 text-white" />
                        </div>
                        Tweet
                    </div>

                    <Post id={id} post={post} PostPage />
                    {comments.length > 0 && (
                        <div className="pb-72">
                            {comments.map(comment => (
                                <Comment
                                    key={comment.id}
                                    id={comment.id}
                                    comment={comment.data()} />
                            ))}
                        </div>
                    )}
                </div>
                <Widget
                    trendingResults={trendingResults}
                    followResults={followResults}
                />

                {isOpen && <Modal />}
            </main>
        </div>
    );
};

export default PostPage;

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