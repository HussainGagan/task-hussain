import { useEffect, useState } from "react";
import Header from "../components/Header";
import { useRecoilState, useSetRecoilState } from "recoil";
import { userState, watchListState } from "../recoilState";
import { onAuthStateChanged } from "firebase/auth";
import { auth, db } from "../firebase-config";
import Spinner from "../components/Spinner";
import TopPicksSection from "../components/TopPicksSection";
import WatchlistSection from "../components/WatchlistSection";
import { doc, getDoc } from "firebase/firestore";
import Top10Section from "../components/Top10Section";
import NowPlaying from "../components/NowPlaying";

function Home() {
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useRecoilState(userState);
  const setWatchlist = useSetRecoilState(watchListState);

  useEffect(() => {
    let unsub;

    unsub = onAuthStateChanged(auth, async (currentUser) => {
      // console.log(currentUser);
      setLoading(false);
      if (currentUser) {
        setUser({
          email: currentUser.email,
          name: currentUser.displayName,
          uid: currentUser.uid,
        });
        const res = await getDoc(doc(db, "users", currentUser.uid));
        if (res.exists()) {
          console.log(res.data());
          // console.log(Boolean(res.data().watchlist));
          setWatchlist(res.data().watchlist || []);
        }
      }
    });

    return () => {
      unsub();
    };
  }, [setUser, setWatchlist]);

  if (loading) {
    return <Spinner />;
  }

  return (
    <>
      <Header user={user} />
      <main className="bg-black h-full">
        <TopPicksSection />
        <WatchlistSection user={user} />
        <Top10Section />
        <NowPlaying />
      </main>
    </>
  );
}

export default Home;
