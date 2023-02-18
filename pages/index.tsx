import { observer } from 'mobx-react';
import { InferGetServerSidePropsType } from 'next';
import { FC } from 'react';
import { Container } from 'react-bootstrap';

import { ArticleList } from '../components/Article/List';
import { PageHead } from '../components/PageHead';
import articleStore, { ArticleModel } from '../models/Article';
import { i18n } from '../models/Translation';
import styles from '../styles/Home.module.less';
import { withTranslation } from './api/core';

export const getServerSideProps = withTranslation(async () => {
  const articles = await new ArticleModel().getList();

  return { props: { articles } };
});

const HomePage: FC<InferGetServerSidePropsType<typeof getServerSideProps>> =
  observer(({ articles }) => {
    const { t } = i18n;

    return (
      <>
        <PageHead />

        <Container as="main" className={styles.main}>
          <ArticleList store={articleStore} defaultData={articles} />
        </Container>
      </>
    );
  });

export default HomePage;
