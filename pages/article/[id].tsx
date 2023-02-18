import { text2color } from 'idea-react';
import { marked } from 'marked';
import { InferGetServerSidePropsType } from 'next';
import Head from 'next/head';
import { FC } from 'react';
import { Badge, Container, Image } from 'react-bootstrap';

import { PageHead } from '../../components/PageHead';
import { ArticleData, ArticleModel } from '../../models/Article';
import { withTranslation } from '../api/core';

export const getServerSideProps = withTranslation<{ id: string }, ArticleData>(
  async ({ params }) => {
    const articleStore = new ArticleModel();

    return { props: await articleStore.getOne(params!.id) };
  },
);

const ArticleDetailPage: FC<
  InferGetServerSidePropsType<typeof getServerSideProps>
> = ({ updatedAt, title, image, author, location, tags, summary, content }) => (
  <Container>
    <Head>
      <link
        rel="stylesheet"
        href="https://unpkg.com/github-markdown-css@5.2.0/github-markdown.css"
      />
    </Head>

    <PageHead title={title} />

    <Image fluid src={image} />

    <h1>{title}</h1>

    <ul className="list-unstyled my-3 d-flex gap-3">
      <li>👩‍🎓 {author}</li>
      <li>🌏 {location}</li>
      <li>🕒 {new Date(updatedAt!).toLocaleString()}</li>
      <li className="ms-auto">
        {tags.split(',').map(tag => (
          <Badge
            as="a"
            key={tag}
            className="text-decoration-none me-2"
            bg={text2color(tag, ['light'])}
            href={`/search?tag=${tag}`}
          >
            {tag}
          </Badge>
        ))}
      </li>
    </ul>
    <blockquote>{summary}</blockquote>

    <article
      className="markdown-body"
      dangerouslySetInnerHTML={{ __html: marked(content) }}
    />
  </Container>
);

export default ArticleDetailPage;
