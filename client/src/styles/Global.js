import { createGlobalStyle } from 'styled-components';

export const GlobalStyles = createGlobalStyle`
  *,
  *::after,
  *::before {
  }
  p{
    margin-bottom:0px;
  }
  a{
    color: ${({ theme }) => theme.text};
    text-decoration: none;
  }
  a:hover{
    color: ${({ theme }) => theme.text};
    text-decoration: none;
  }
  h5{
    font-size:16px;
    font-weight:bold;
  }
body {
    background: ${({ theme }) => theme.body};
    color: ${({ theme }) => theme.text};
  }
  .card-reddit {
    border-radius: 4px;
    padding: 10px;
    margin-top: 20px;
    background: ${({ theme }) => theme.background};
    border: ${({ theme }) => theme.border};
    color: ${({ theme }) => theme.text};
  }
  .nav-tabs .nav-item.show .nav-link, .nav-tabs .nav-link.active {
    color: ${({ theme }) => theme.text};
    background-color:${({ theme }) => theme.background};
}
  .theme-input{
    background: ${({ theme }) => theme.background};
  }
  .switch{
    padding: .25rem 1.5rem;
    width:200px;
    display:flex;
  }
  .switch-label{
    margin-left:10px;
  }
  .pointer {
    cursor: pointer;
  }
  .categories{
    padding:10px 5px;
  }
  .categories:hover {
    background-color: #dae0e6;
  }
  .subreddit-thumbnail{
    width: 40px;
    height:40px;
    border-radius:40px;
  }
  .subreddit-img{
    width: 80px;
    height:80px;
  }

.pointer {
  cursor: pointer;
}
.category{
  padding:10px 5px;
  cursor: pointer;
}
.category:hover {
  background-color: #dae0e6;
  cursor: pointer;
}
.selected-category{
  padding:10px 5px;
  cursor: pointer;
  background-color: #dae0e6;
  border-left:2px solid black;
}
.subreddit-thumbnail{
  width: 40px;
  height:40px;
  border-radius:40px;
}
.subreddit-img{
  width: 80px;
  height:80px;
}
.hidden {
  display: none;
}
.icon{
  width:30px;
  height:30px;
  padding:5px;
}
.skeleton-user {
  border:solid 1px #E8E8E8;
  margin-bottom:5px;
  border-radius: 4px;
  height: 30px;
  width:100%;
  margin-left:10px;
  position: relative;
  overflow: hidden;
}
.skeleton-user::before {
  content: '';
  display: block;
  position: absolute;
  left: -150px;
  top: 0;
  height: 100%;
  width: 150px;
  background: linear-gradient(to right, transparent 0%, #E8E8E8 50%, transparent 100%);
  animation: load 1s cubic-bezier(0.4, 0.0, 0.2, 1) infinite;
}
.skeleton-avatar {
  border:solid 1px #E8E8E8;
  margin-bottom:5px;
  border-radius: 4px;
  height: 30px;
  width:30px;
  border-radius:100%;
  position: relative;
  overflow: hidden;
}
.skeleton-avatar::before {
  content: '';
  display: block;
  position: absolute;
  left: -150px;
  top: 0;
  height: 100%;
  width: 150px;
  background: linear-gradient(to right, transparent 0%, #E8E8E8 50%, transparent 100%);
  animation: load 1s cubic-bezier(0.4, 0.0, 0.2, 1) infinite;
}
.skeleton-title {
  border:solid 1px #E8E8E8;
  margin-bottom:5px;
  border-radius: 4px;
  height: 50px;
  position: relative;
  overflow: hidden;
}
.skeleton-title::before {
  content: '';
  display: block;
  position: absolute;
  left: -150px;
  top: 0;
  height: 100%;
  width: 150px;
  background: linear-gradient(to right, transparent 0%, #E8E8E8 50%, transparent 100%);
  animation: load 1s cubic-bezier(0.4, 0.0, 0.2, 1) infinite;
}
.skeleton-media {
  border:solid 1px #E8E8E8;
  border-radius: 4px;
  height: 100px;
  position: relative;
  overflow: hidden;
}
.skeleton-media::before {
  content: '';
  display: block;
  position: absolute;
  left: -150px;
  top: 0;
  height: 100%;
  width: 150px;
  background: linear-gradient(to right, transparent 0%, #E8E8E8 50%, transparent 100%);
  animation: load 1s cubic-bezier(0.4, 0.0, 0.2, 1) infinite;
}
@keyframes load {
  from {
      left: -150px;
  }
  to   {
      left: 100%;
  }
}
  `;
