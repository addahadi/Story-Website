import './App.css'
import {  Route , Routes } from 'react-router-dom'
import Feed from './app/Feed';
import Story from './app/Story';
import PeopleStory from './app/PeopleStory';
import Profile from './app/Profile';
import { UserProvider } from './context/UserCon';
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


function App() {
  return (
    <StoryProvider>
      <UserProvider>
        <Routes>
            <Route path="/browse" element = {
                <LayouT>
                    <Browse />
                </LayouT>
            }/>
            <Route path="/category/:categoryId" element={
                <LayouT>
                    <Category/>
                </LayouT>
            }/>
          <Route
            path="/"
            element={
              <LayouT>
                <Feed />
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
            <Route path="about" element={<About/>}/>
            <Route path="home" element={<Home/>}/>
          </Route>
          <Route
            path="/new"
            element={
              <LayouT>
                <StoryDetail />
              </LayouT>
            }
          />
          <Route path = "/read/:readId" element = {
              <LayouT>
                  <ReadStory />
              </LayouT>
          }  />
          <Route path="/signin" element={<Register />} />
          <Route path="/session/:sessionId" element={<Sessions/>}/>
        </Routes>
      </UserProvider>
    </StoryProvider>
  );
}

export default App
