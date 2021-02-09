import React from 'react';
import Header from '~/components/Header';
import Footer from '~/components/Footer';
import SEOTags from '~/components/SEOTags';
import { NewExercise } from '~/components/create-view-edit-exercise';

export default function NewExercisePage() {
  return (
    <>
      <SEOTags
        title="Creează un exercițiu | FrontEnd.ro"
        description="Scrie un nou exercițiu pe care-l poți propune pentru lecțiile noastre sau îl poți folosi în propriile traininguri."
        shareImage="https://frontend.ro/seo/create-exercise.jpg"
        url="https://FrontEnd.ro/exercitii/new"
      />
      <>
        <Header />
        <NewExercise />
        <Footer />
      </>
    </>
  );
}
