import React from "react";
import { Switch, Route, Redirect } from "react-router-dom";
import Login from "./Login";
import Register from "./Register";
import Hello from "./Hello";
import PostList from "./Post/PostList";
import PostDetails from "./Post/PostDetails";
import AllPostsFromCurrentUser from "./Post/UserPosts";
import CommentList from "./Comment/CommentList";
import CategoryList from "./Categories/CategoryList";
import CategoryForm from "./Categories/CategoryForm";
import CategoryEdit from "./Categories/CategoryEdit";
import TagList from "./Tag/TagList";
import UserProfileList from "./Users/UserProfileList"
import TagAddForm from "./Tag/TagAddForm";
import PostForm from './Post/PostForm';
import CommentForm from "./Comment/CommentAddForm";
import TagEditForm from "./Tag/TagEditForm";
import AddTagToPost from "./Tag/AddTagToPost";
import UserProfileDetails from "./Users/UserProfileDetails";

export default function ApplicationViews({ isLoggedIn }) {

  return (
    <main>
      <Switch>

        <Route path="/" exact>
          {isLoggedIn ? <Hello /> : <Redirect to="/login" />}
        </Route>

        <Route path="/post" exact>
          {isLoggedIn ? <PostList /> : <Redirect to="/login" />}
        </Route>

        <Route path="/post/details/:id" exact>
          {isLoggedIn ? <PostDetails /> : <Redirect to="/login" />}
        </Route>

        <Route path="/myPosts" exact>
          {isLoggedIn ? <AllPostsFromCurrentUser /> : <Redirect to="/login" />}
        </Route>

        <Route path="/post/add" exact>
          {isLoggedIn ? <PostForm /> : <Redirect to="/login" />}
        </Route>

        <Route path="/comment/PostId/:id" exact>
          {isLoggedIn ? <CommentList /> : <Redirect to="/login" />}
        </Route>

        <Route path="/category" exact>
          {isLoggedIn ? <CategoryList /> : <Redirect to="/login" />}
        </Route>

        <Route path="/tag" exact>
          {isLoggedIn ? <TagList /> : <Redirect to="/login" />}
        </Route>

        <Route path="/tag/add" exact>
          {isLoggedIn ? <TagAddForm /> : <Redirect to="/login" />}
        </Route>

        <Route path="/tag/addtag/:id" exact>
          {isLoggedIn ? <AddTagToPost /> : <Redirect to="/login" />}
        </Route>

        <Route path="/tag/:id" exact>
          {isLoggedIn ? <TagEditForm /> : <Redirect to="/login" />}
        </Route>

        <Route path="/category/add" exact>
          {isLoggedIn ? <CategoryForm /> : <Redirect to="/login" />}
        </Route>

        <Route path="/category/:id" exact>
          {isLoggedIn ? <CategoryEdit /> : <Redirect to="/login" />}
        </Route>

        <Route path="/comment/add/:id" exact>
          {isLoggedIn ? <CommentForm /> : <Redirect to="/login" />}
        </Route>

        <Route path="/userProfile" exact>
          {isLoggedIn ? <UserProfileList /> : <Redirect to="/login" />}
        </Route>

        <Route path="/userProfile/details/:id" exact>
          {isLoggedIn ? <UserProfileDetails /> : <Redirect to="/login" />}
        </Route>

        <Route path="/login">
          <Login />
        </Route>

        <Route path="/register">
          <Register />
        </Route>
      </Switch>
    </main>
  );
};
