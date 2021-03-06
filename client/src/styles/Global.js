import { createGlobalStyle } from 'styled-components';

export const GlobalStyles = createGlobalStyle`
  *,
  *::after,
  *::before {
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
  .community-thumbnail{
    width: 40px;
    height:40px;
    border-radius:40px;
  }
  .community-img{
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
.community-thumbnail{
  width: 40px;
  height:40px;
  border-radius:40px;
}
.community-img{
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
  `;
