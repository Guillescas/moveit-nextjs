/* eslint-disable react/require-default-props */
/* eslint-disable react/destructuring-assignment */
import Head from 'next/head';
import React, { ReactElement } from 'react';
import { GetServerSideProps } from 'next';

import { ChallengeBox } from '../components/ChallengeBox';
import { CompletedChallenges } from '../components/CompletedChallenges';
import { Countdown } from '../components/Countdown';
import ExperienceBar from '../components/ExperienceBar';
import { Profile } from '../components/Profile';
import { CountdownProvider } from '../contexts/CountdownContext';

import styles from '../styles/pages/Home.module.css';
import { ChallengesProvider } from '../contexts/ChallengesContext';
import { LeftMenu } from '../components/LeftMenu';

interface HomeProps {
  session?: {
    user: {
      name: string;
      email: string;
      image: string;
    }
  };
}

export default function Dashboard(props: HomeProps): ReactElement {
  return (
    <ChallengesProvider
      session={props.session}

    >

      <div className={styles.container}>
        <Head>
          <title>Início | move.it</title>
        </Head>

        <LeftMenu />

        <ExperienceBar />

        <CountdownProvider>
          <section>
            <div>
              <Profile />
              <CompletedChallenges />
              <Countdown />
            </div>
            <div>
              <ChallengeBox />
            </div>
          </section>
        </CountdownProvider>
      </div>
    </ChallengesProvider>
  );
}

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const { level, currentExperience, challengesCompleted } = ctx.req.cookies;

  return {
    props: {
      level: Number(level),
      currentExperience: Number(currentExperience),
      challengesCompleted: Number(challengesCompleted),
    },
  };
};
