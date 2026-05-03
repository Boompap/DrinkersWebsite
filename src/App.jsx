import { useEffect, useRef, useState } from "react";
import "./App.css";

const drinkCards = [
  {
    name: "Beer",
    percent: "5%",
    text: "Play one additional Drink card this turn, as long as it has 15% or less alcohol.",
  },
  {
    name: "Red Wine",
    percent: "10%",
    text: "If played alongside Cheers or On Me!, that effect triggers twice.",
  },
  {
    name: "Vodka",
    percent: "20%",
    text: "Draw 1 card. If it is a Drink, consume it and apply its percentage. If it is a Utility card, discard it.",
  },
  {
    name: "Whiskey",
    percent: "25%",
    text: "If this pushes you above 100%, set your alcohol meter to 80% instead and do not discard 2 cards.",
  },
  {
    name: "Cocktail",
    percent: "15%",
    text: "Play it alongside Lemon Slice, Ice, Soda, Salt Rim, or Syrup to play one extra Utility card this turn.",
  },
  {
    name: "Liqueur",
    percent: "15%",
    text: "Choose a player. They reveal their hand, then choose 1 card to discard.",
  },
];

const faq = [
  {
    question: "Do I have to play cards on my turn?",
    answer:
      "No. You do not have to play cards. If you do not play a Drink card, you draw 2 cards at the end of your turn instead of 1.",
  },
  {
    question: "What does alongside mean?",
    answer:
      "Alongside means both cards are played at the same time. If a canceling effect like Spill cancels the Drink, both cards are lost.",
  },
  {
    question: "How do random effects work?",
    answer:
      "Any card that mentions random should be resolved randomly, without choosing the target card directly.",
  },
  {
    question: "When can Coffee and Spill be used?",
    answer:
      "Coffee and Spill should be used like reaction cards, in response to another card or effect.",
  },
  {
    question: "What if I have no cards to discard?",
    answer: "If you have no cards, you do not discard anything.",
  },
  {
    question: "How do table-wide effects resolve?",
    answer:
      "Anything that makes everyone take an action resolves turn-wise, starting with the player who activated the effect.",
  },
];

const comboVideos = ["/videos/limesvideo.mp4", "/videos/lemonsvideo.mp4"];

function App() {
  const [beerProgress, setBeerProgress] = useState(0);
  const [comboVideoIndex, setComboVideoIndex] = useState(0);

  const barrelSoundOneRef = useRef(null);
  const barrelSoundTwoRef = useRef(null);
  const beerSoundRef = useRef(null);
  const beerSoundTimeoutRef = useRef(null);

  const currentComboVideo = comboVideos[comboVideoIndex];

  const playNextComboVideo = () => {
    setComboVideoIndex(
      (currentIndex) => (currentIndex + 1) % comboVideos.length,
    );
  };

  const playBarrelSound = (event) => {
    const clickedElement = event.target;

    if (
      clickedElement.closest(
        "a, button, input, textarea, select, video, img, .card-panel, .game-card, .puke-card, .contents-grid article, .faq-grid article, .combo-grid article, .image-strip-card, .hero-logo-link",
      )
    ) {
      return;
    }

    const sounds = [barrelSoundOneRef.current, barrelSoundTwoRef.current];
    const randomSound = sounds[Math.floor(Math.random() * sounds.length)];

    if (randomSound) {
      randomSound.currentTime = 0;
      randomSound.volume = 0.2;
      randomSound.play();
    }
  };

  const playBeerSound = (event) => {
    event.stopPropagation();

    const sound = beerSoundRef.current;

    if (sound) {
      clearTimeout(beerSoundTimeoutRef.current);

      sound.currentTime = 0;
      sound.volume = 0.2;
      sound.play();

      beerSoundTimeoutRef.current = setTimeout(() => {
        sound.pause();
        sound.currentTime = 0;
      }, 2500);
    }
  };

  useEffect(() => {
    const updateBeerProgress = () => {
      const scrollTop = window.scrollY;
      const pageHeight =
        document.documentElement.scrollHeight - window.innerHeight;

      const progress = pageHeight > 0 ? scrollTop / pageHeight : 0;
      setBeerProgress(Math.min(1, Math.max(0, progress)));
    };

    updateBeerProgress();
    window.addEventListener("scroll", updateBeerProgress);

    return () => window.removeEventListener("scroll", updateBeerProgress);
  }, []);

  return (
    <main style={{ "--beer-progress": beerProgress }} onClick={playBarrelSound}>
      <audio ref={barrelSoundOneRef} preload="auto">
        <source src="/sounds/woodendoor.wav" type="audio/wav" />
      </audio>

      <audio ref={barrelSoundTwoRef} preload="auto">
        <source src="/sounds/woodentable.wav" type="audio/wav" />
      </audio>

      <audio ref={beerSoundRef} preload="auto">
        <source src="/sounds/beerclick.mp3" type="audio/mpeg" />
      </audio>

      <div
        className="beer-video-side left"
        aria-hidden="true"
        onClick={playBeerSound}
      >
        <video autoPlay muted loop playsInline>
          <source src="/videos/beerleftside.mp4" type="video/mp4" />
        </video>
      </div>

      <div
        className="beer-video-side right"
        aria-hidden="true"
        onClick={playBeerSound}
      >
        <video autoPlay muted loop playsInline>
          <source src="/videos/beerrightside.mp4" type="video/mp4" />
        </video>
      </div>

      <header className="navbar">
        <div className="nav-inner">
          <a href="#top" className="logo">
            Drinkers 1000
          </a>

          <nav className="nav-links">
            <a href="#how">How to Win</a>
            <a href="#cards">Cards</a>
            <a href="#box">What You Get</a>
            <a href="#faq">FAQ</a>
          </nav>

          <a href="#notify" className="nav-button">
            Notify Me
          </a>
        </div>
      </header>

      <section id="top" className="hero">
        <div className="hero-content hero-centered">
          <a
            className="tag"
            href="https://your-kickstarter-link-here.com"
            target="_blank"
            rel="noreferrer"
          >
            Now on Kickstarter
          </a>

          <a
            className="hero-title-link"
            href="https://your-link-here.com"
            target="_blank"
            rel="noreferrer"
            aria-label="Drinkers 1000"
          >
            <svg
              className="hero-title-svg"
              viewBox="0 0 1200 180"
              role="img"
              aria-labelledby="drinkers-title"
            >
              <title id="drinkers-title">Drinkers 1000</title>

              <defs>
                <mask id="drinkersTitleMask">
                  <rect width="1200" height="180" fill="black" />

                  <text
                    x="50%"
                    y="50%"
                    textAnchor="middle"
                    dominantBaseline="middle"
                    fontFamily="Arial, Helvetica, sans-serif"
                    fontSize="145"
                    fontWeight="900"
                    letterSpacing="-8"
                    fill="white"
                  >
                    Drinkers 1000
                  </text>
                </mask>
              </defs>

              <text
                x="50%"
                y="50%"
                textAnchor="middle"
                dominantBaseline="middle"
                fontFamily="Arial, Helvetica, sans-serif"
                fontSize="145"
                fontWeight="900"
                letterSpacing="-8"
                fill="#fcd34d"
              >
                Drinkers 1000
              </text>

              <foreignObject
                x="0"
                y="0"
                width="1200"
                height="180"
                mask="url(#drinkersTitleMask)"
                className="hero-title-foam-object"
              >
                <video
                  className="hero-title-foam-video"
                  autoPlay
                  muted
                  loop
                  playsInline
                >
                  <source src="/videos/beerfoam.mp4" type="video/mp4" />
                </video>
              </foreignObject>
            </svg>
          </a>

          <p className="hero-hook">
            The chaotic card game of risky drinks, table sabotage, and perfect
            timing.
          </p>

          <div className="hero-description-box">
            <p className="hero-text hero-text-centered">
              Drinkers 1000 is an alcohol-themed party card game where players
              race to hit exactly 100% on their alcohol meter. Push your luck,
              play clever combos, mess with the table, and avoid going over the
              limit.
            </p>
          </div>

          <p className="small-note">
            No real drinking is required to play. The alcohol meter is the
            game’s score system.
          </p>

          <div className="button-row hero-buttons">
            <a href="#notify" className="primary-button">
              Notify Me on Launch
            </a>

            <a href="#how" className="secondary-button">
              Learn How It Plays
            </a>
          </div>

          <div className="hero-logo-card">
            <a
              className="hero-logo-link"
              href="https://your-link-here.com"
              target="_blank"
              rel="noreferrer"
            >
              <img
                className="hero-logo-image"
                src="/images/harpoonslogo1.png"
                alt="Harpoon Games logo"
              />

              <video
                className="hero-logo-water"
                autoPlay
                muted
                loop
                playsInline
              >
                <source src="/videos/waves1.mp4" type="video/mp4" />
              </video>
            </a>

            <p className="mockup-subtitle">
              A party game made by Harpoon Games
            </p>
          </div>
        </div>
      </section>

      <section className="quick-points image-card-strip">
        <article className="image-strip-card image-strip-1">
          <h3>Fast to learn</h3>
          <p>
            Play 1 Drink card and 1 Utility card each turn, then draw at the end
            of your turn.
          </p>
        </article>

        <article className="image-strip-card image-strip-2">
          <h3>Always unstable</h3>
          <p>
            Cards can boost, lower, cancel, steal, recycle, reveal, or force
            surprise drinks.
          </p>
        </article>

        <article className="image-strip-card image-strip-3">
          <h3>Win at 100%</h3>
          <p>
            Land exactly on 100% at the start or end of your turn to win the
            game.
          </p>
        </article>

        <article className="image-strip-card image-strip-4">
          <h3>The Table Awaits</h3>
          <p>Every round feels like a bad idea waiting to happen.</p>
        </article>
      </section>

      <section id="how" className="section dark-section">
        <div className="two-column">
          <div>
            <p className="section-label">How to Win</p>
            <h2>Reach exactly 100% without overdoing it.</h2>

            <p>
              Every player starts at 0% and raises their alcohol meter by
              playing Drink cards. The trick is landing exactly on 100%, while
              other players use Utility cards to pull you back, push you over,
              steal from you, or cancel your best play.
            </p>
          </div>

          <div className="puke-card">
            <span>🤢</span>
            <h3>The Puke Effect</h3>
            <p>
              Go above 100% and things get messy. Your alcohol meter crashes
              back down to 70%, and you discard 2 cards. It is a brutal setback,
              but it also keeps the race chaotic until the final turn.
            </p>
          </div>
        </div>
      </section>

      <section id="cards" className="section">
        <p className="section-label">The Cards</p>
        <h2>Two card types, endless bad decisions.</h2>

        <div className="card-rows">
          <div className="card-panel card-row-panel drink-panel-bg">
            <h3>Drink Cards</h3>

            <p>
              Drink cards are the heart of the game. Each one adds alcohol
              percentage to your meter and triggers a unique effect. The cards
              shown below are example samples from the game.
            </p>

            <div className="drink-image-row">
              <img src="/images/Beer.png" alt="Drink card 1" />
              <img src="/images/Cocktail.png" alt="Drink card 2" />
              <img src="/images/Rum.png" alt="Drink card 3" />
            </div>
          </div>

          <div className="card-panel card-row-panel utility-panel-bg">
            <h3>Utility Cards</h3>
            <p>
              Utility cards twist the rules. Use them to adjust meters, defend
              yourself, disrupt others, or set up the perfect combo. The cards
              shown below are example samples from the game.
            </p>
            <div className="utility-image-row">
              <img src="/images/SaltRim.png" alt="Utility card 1" />
              <img src="/images/LemonSlice.png" alt="Utility card 2" />
              <img src="/images/Recycle.png" alt="Utility card 3" />
            </div>
          </div>
        </div>
      </section>

      <section className="section dark-section">
        <p className="section-label">Combos & Chaos</p>

        <h2>
          Cards change each other when played alongside the right partner.
        </h2>

        <div className="combo-grid">
          <article className="combo-video-card">
            <video
              key={`combo-one-${currentComboVideo}`}
              className="combo-card-video combo-video-left"
              autoPlay
              muted
              playsInline
              onEnded={playNextComboVideo}
            >
              <source src={currentComboVideo} type="video/mp4" />
            </video>

            <h3>Beer + Salt Rim</h3>
            <p>
              Ignore Salt Rim’s discard requirement and keep the pressure going.
            </p>
          </article>

          <article className="combo-video-card">
            <video
              key={`combo-two-${currentComboVideo}`}
              className="combo-card-video combo-video-center"
              autoPlay
              muted
              playsInline
            >
              <source src={currentComboVideo} type="video/mp4" />
            </video>

            <h3>White Wine + Soda</h3>
            <p>
              Turn a clean Utility into a dangerous +15% swing, then discard 1
              card.
            </p>
          </article>

          <article className="combo-video-card">
            <video
              key={`combo-three-${currentComboVideo}`}
              className="combo-card-video combo-video-right"
              autoPlay
              muted
              playsInline
            >
              <source src={currentComboVideo} type="video/mp4" />
            </video>

            <h3>Sake + Overpoured Glass</h3>
            <p>
              Draw a card while everyone else discards, flipping a friendly
              toast into a table-wide problem.
            </p>
          </article>
        </div>
      </section>

      <section id="box" className="section">
        <p className="section-label">What You Get</p>
        <h2>Everything needed to start playing fast.</h2>

        <div className="contents-grid">
          <article>
            <strong>72</strong>
            <p>Total Cards</p>
          </article>

          <article>
            <strong>44</strong>
            <p>Drink Cards</p>
          </article>

          <article>
            <strong>26</strong>
            <p>Utility Cards</p>
          </article>

          <article>
            <strong>1</strong>
            <p>Rulebook</p>
          </article>

          <article>
            <strong>+</strong>
            <p>Alcohol Meter Cards</p>
          </article>
        </div>

        <p className="wide-text">
          The rulebook explains the general rules, card mechanics, common
          interactions, and clarifications so groups can start playing quickly
          and resolve edge cases without slowing down the table.
        </p>
      </section>

      <section className="section dark-section">
        <p className="section-label">Printing & Shipping</p>
        <h2>Production details coming soon.</h2>

        <p className="wide-text">
          Use this section for manufacturing details, shipping regions,
          estimated delivery windows, taxes, VAT notes, and whether backers will
          receive tracking information.
        </p>
      </section>

      <section id="faq" className="section">
        <p className="section-label">FAQ</p>
        <h2>Common Questions</h2>

        <div className="faq-grid">
          {faq.map((item) => (
            <article key={item.question}>
              <h3>{item.question}</h3>
              <p>{item.answer}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="section dark-section contact-section">
        <div className="contact-box">
          <p className="section-label">Still Have Questions?</p>

          <h2>Contact us anytime.</h2>

          <p>
            If you have more questions about Drinkers 1000, the Kickstarter
            campaign, shipping, gameplay, or anything else, feel free to contact
            us at{" "}
            <a
              href="https://mail.google.com/mail/?view=cm&fs=1&to=harpoongames@gmail.com"
              className="email-link"
              target="_blank"
              rel="noreferrer"
            >
              harpoongames@gmail.com
            </a>
            .
          </p>
        </div>
      </section>

      <section id="notify" className="cta-section">
        <div className="cta-box">
          <div>
            <h2>Ready to join the table?</h2>
            <p>
              Follow the campaign, get launch updates, and be there when
              Drinkers 1000 goes live on Kickstarter.
            </p>
          </div>

          <a href="#" className="cta-button">
            Join now on Kickstarter!
          </a>
        </div>
      </section>

      <footer>
        <p>
          Drinkers 1000 is an alcohol-themed card game. Please drink responsibly
          if you choose to play with real drinks.
        </p>
      </footer>
    </main>
  );
}

export default App;
