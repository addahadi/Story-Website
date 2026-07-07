import './App.css'
import { Route, Routes } from 'react-router-dom'
import Feed from './app/Feed';
import Story from './app/Story';
import PeopleStory from './app/PeopleStory';
import Profile from './app/Profile';
import { UserProvider, useUser } from './context/UserCon';
import LayouT from './layout';
import Register from './app/Register';
import StoryDetail from './app/StoryDetail';
import Sessions from './app/Session';
import { StoryProvider } from './context/StoryCon';
import ReadStory from "@/app/ReadStory.tsx";
import About from "@/app/About.tsx";
import Home from "@/app/Home.tsx";
import Browse from "@/app/Browse.tsx";
import Category from "@/app/Category.tsx";
import Landing from "@/app/Landing.tsx";

/**
 * Home route for "/".
 * Rendered INSIDE <UserProvider>, so useUser() is safe here.
 * - Logged-out visitors  -> marketing landing page (self-contained, no LayouT).
 * - Logged-in users       -> the app feed inside the normal layout.
 *
 * `authReady` (from UserCon) is false until Firebase's onAuthStateChanged has
 * resolved once. We hold rendering until then so a logged-in user never sees
 * the landing flash on hard reload.
 */
const HomeRoute = () => {
  const { currentUser, authReady } = useUser();
  if (!authReady) return null; // brief, prevents the landing-page flash
  return currentUser ? (
    <LayouT>
      <Feed />
    </LayouT>
  ) : (
    <Landing />
  );
};

function App() {
  return (
    <StoryProvider>
      <UserProvider>
        <Routes>
          <Route path="/" element={<HomeRoute />} />

          <Route
            path="/browse"
            element={
              <LayouT>
                <Browse />
              </LayouT>
            }
          />
          <Route
            path="/category/:categoryId"
            element={
              <LayouT>
                <Category />
              </LayouT>
            }
          />
          <Route
            path="/story/:storyId"
            element={
              <LayouT>
                <Story />
              </LayouT>
            }
          />
          <Route
            path="/people"
            element={
              <LayouT>
                <PeopleStory />
              </LayouT>
            }
          />
          <Route
            path="/Profile/:profileId"
            element={
              <LayouT>
                <Profile />
              </LayouT>
            }
          >
            <Route path="about" element={<About />} />
            <Route path="home" element={<Home />} />
          </Route>
          <Route
            path="/new"
            element={
              <LayouT>
                <StoryDetail />
              </LayouT>
            }
          />
          <Route
            path="/read/:readId"
            element={
              <LayouT>
                <ReadStory />
              </LayouT>
            }
          />
          <Route path="/signin" element={<Register />} />
          <Route path="/session/:sessionId" element={<Sessions />} />
        </Routes>
      </UserProvider>
    </StoryProvider>
  );
}

export default App
