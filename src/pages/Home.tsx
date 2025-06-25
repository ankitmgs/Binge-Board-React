import { HeroBanner } from "../components/banner/HeroBanner";
import HomeMoviesSection from "../components/homeMovies";

function Home() {

  const item = [
    {
        "id": "552524",
        "title": "Lilo & Stitch",
        "posterUrl": "https://image.tmdb.org/t/p/w500/7c5VBuCbjZOk7lSfj9sMpmDIaKX.jpg",
        "backdropUrl": "https://image.tmdb.org/t/p/w1280/7Zx3wDG5bBtcfk8lcnCWDOLM4Y4.jpg",
        "overview": "The wildly funny and touching story of a lonely Hawaiian girl and the fugitive alien who helps to mend her broken family.",
        "genre": "Family",
        "genre_ids": [
            10751,
            878,
            35,
            12
        ],
        "media_type": "movie",
        "popularity": 418.9379,
        "original_language": "en",
        "release_date": "2025-05-23"
    },
    {
        "id": "1087192",
        "title": "How to Train Your Dragon",
        "posterUrl": "https://image.tmdb.org/t/p/w500/q5pXRYTycaeW6dEgsCrd4mYPmxM.jpg",
        "backdropUrl": "https://image.tmdb.org/t/p/w1280/7HqLLVjdjhXS0Qoz1SgZofhkIpE.jpg",
        "overview": "On the rugged isle of Berk, where Vikings and dragons have been bitter enemies for generations, Hiccup stands apart, defying centuries of tradition when he befriends Toothless, a feared Night Fury dragon. Their unlikely bond reveals the true nature of dragons, challenging the very foundations of Viking society.",
        "genre": "Fantasy",
        "genre_ids": [
            14,
            10751,
            28
        ],
        "media_type": "movie",
        "popularity": 351.4487,
        "original_language": "en",
        "release_date": "2025-06-13"
    },
    {
        "id": "1100988",
        "title": "28 Years Later",
        "posterUrl": "https://image.tmdb.org/t/p/w500/361hRZoG91Nw6qXaIKuGoogQjix.jpg",
        "backdropUrl": "https://image.tmdb.org/t/p/w1280/6WqqEjiycNvDLjbEClM1zCwIbDD.jpg",
        "overview": "Twenty-eight years since the rage virus escaped a biological weapons laboratory, now, still in a ruthlessly enforced quarantine, some have found ways to exist amidst the infected. One such group lives on a small island connected to the mainland by a single, heavily-defended causeway. When one member departs on a mission into the dark heart of the mainland, he discovers secrets, wonders, and horrors that have mutated not only the infected but other survivors as well.",
        "genre": "Horror",
        "genre_ids": [
            27,
            53,
            878
        ],
        "media_type": "movie",
        "popularity": 296.7897,
        "original_language": "en",
        "release_date": "2025-06-20"
    },
    {
        "id": "1127110",
        "title": "Diablo",
        "posterUrl": "https://image.tmdb.org/t/p/w500/uFQduVyYIinJy3eLjozgfl6Xtcn.jpg",
        "backdropUrl": "https://image.tmdb.org/t/p/w1280/fPWJn5pqBr8n4h0YxW3QuasdvoI.jpg",
        "overview": "Ex-con Kris Chaney seizes the daughter of a Colombian gangster to fulfill a noble promise to the young girl's mother. When her father enlists both the criminal underworld and a psychotic killer to exact his revenge, Kris relies on everything he's ever learned to stay alive and keep his word.",
        "genre": "Action",
        "genre_ids": [
            28,
            53
        ],
        "media_type": "movie",
        "popularity": 261.3418,
        "original_language": "en",
        "release_date": "2025-06-13"
    },
    {
        "id": "803796",
        "title": "KPop Demon Hunters",
        "posterUrl": "https://image.tmdb.org/t/p/w500/22AouvwlhlXbe3nrFcjzL24bvWH.jpg",
        "backdropUrl": "https://image.tmdb.org/t/p/w1280/l3ycQYwWmbz7p8otwbomFDXIEhn.jpg",
        "overview": "When K-pop superstars Rumi, Mira and Zoey aren't selling out stadiums, they're using their secret powers to protect their fans from supernatural threats.",
        "genre": "Animation",
        "genre_ids": [
            16,
            14,
            28,
            35,
            10402
        ],
        "media_type": "movie",
        "popularity": 281.0059,
        "original_language": "en",
        "release_date": "2025-06-20"
    },
    {
        "id": "170",
        "title": "28 Days Later",
        "posterUrl": "https://image.tmdb.org/t/p/w500/sQckQRt17VaWbo39GIu0TMOiszq.jpg",
        "backdropUrl": "https://image.tmdb.org/t/p/w1280/3s7uwQKH0WmaeO7VCqAOK3C5gjF.jpg",
        "overview": "Twenty-eight days after a killer virus was accidentally unleashed from a British research facility, a small group of London survivors are caught in a desperate struggle to protect themselves from the infected. Carried by animals and humans, the virus turns those it infects into homicidal maniacs -- and it's absolutely impossible to contain.",
        "genre": "Horror",
        "genre_ids": [
            27,
            53,
            878
        ],
        "media_type": "movie",
        "popularity": 142.488,
        "original_language": "en",
        "release_date": "2003-06-27"
    },
    {
        "id": "575265",
        "title": "Mission: Impossible - The Final Reckoning",
        "posterUrl": "https://image.tmdb.org/t/p/w500/z53D72EAOxGRqdr7KXXWp9dJiDe.jpg",
        "backdropUrl": "https://image.tmdb.org/t/p/w1280/aEG09hZZEDZ23Y9WYI701W6Gwnb.jpg",
        "overview": "Ethan Hunt and team continue their search for the terrifying AI known as the Entity — which has infiltrated intelligence networks all over the globe — with the world's governments and a mysterious ghost from Hunt's past on their trail. Joined by new allies and armed with the means to shut the Entity down for good, Hunt is in a race against time to prevent the world as we know it from changing forever.",
        "genre": "Action",
        "genre_ids": [
            28,
            12,
            53
        ],
        "media_type": "movie",
        "popularity": 126.3902,
        "original_language": "en",
        "release_date": "2025-05-23"
    }
];


  return (
    <main className="container mx-auto py-6 sm:py-8 mt-[65px]">
      <div className="px-4">
        <h1 className="text-4xl sm:text-5xl font-extrabold mb-6 sm:mb-8 text-center tracking-tight">
          <span className="bg-clip-text text-transparent bg-gradient-to-r from-purple-600 via-pink-500 to-indigo-600">
            BingeBoard
          </span>
        </h1>
      </div>

      <HeroBanner items={item} />

      <HomeMoviesSection />
    </main>
  );
}

export default Home;
