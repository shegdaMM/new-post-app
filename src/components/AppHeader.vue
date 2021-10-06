<template>
    <header class="text-black my-header" id="header">
        <div class="app-header-links">
            <!-- logo -->
              <a href="/" class="app-header-logo">
              <img
                alt="logo"
                style="width: 100%; min-height: 65px; min-width: 100px"
                src="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' id='Layer_1' data-name='Layer 1' viewBox='0 0 601.22 192.52'%3E%3Cdefs/%3E%3Cdefs%3E%3CclipPath id='clip-path' transform='translate(.92 .2)'%3E%3Cpath fill='none' d='M198.17.72c-32.84 0-65.71-.26-98.54-.26C45 .46.64 43.4.64 96.38v95.91h105v-.18c51.89-3 93-44.71 93-95.74-.01-31.82-.47-63.77-.47-95.65z' clip-rule='evenodd'/%3E%3C/clipPath%3E%3Cstyle%3E.cls-2%7Bfill:%2300af89;fill-rule:evenodd%7D%3C/style%3E%3C/defs%3E%3Cpath d='M198.17.72c-32.84 0-65.71-.26-98.54-.26C45 .46.64 43.4.64 96.38v95.91h105v-.18c51.89-3 93-44.71 93-95.74-.01-31.82-.47-63.77-.47-95.65z' class='cls-2' transform='translate(.92 .2)'/%3E%3Cpath fill='none' stroke='%23000' stroke-miterlimit='22.93' stroke-width='1.92' d='M.67 191.13L198.81.69' opacity='.03'/%3E%3Cpath d='M234.62 121.86V20h26.25v101.86zm144.54-8.55a78.42 78.42 0 01-18.79 7.8 78.93 78.93 0 01-20.18 2.54 64.13 64.13 0 01-21.96-3.65 50.53 50.53 0 01-17.52-10.71A49.39 49.39 0 01289 92.13 54.78 54.78 0 01284.9 71q0-23.75 15.83-38.28t41.83-14.52a80.16 80.16 0 0118.17 2 82.26 82.26 0 0117.52 6.26v23.96a69.68 69.68 0 00-17-8.18 55.78 55.78 0 00-17.05-2.71q-15.4 0-24.26 8.38T311.15 71q0 14.28 8.45 22.79t22.72 8.53a55.33 55.33 0 0018.42-3.23 77.87 77.87 0 0018.42-9.59v23.81zM498.39 20v58.31q0 21.4-12.7 33.36t-35.5 12q-22.74 0-35.45-12T402 78.31V20h25.7v57.29q0 12.15 5.82 18.59c3.88 4.3 9.52 6.44 16.88 6.44s12.93-2.14 16.75-6.41 5.74-10.46 5.74-18.62V20zm26.3 93.76V91.13a109.2 109.2 0 0019.41 10 45.26 45.26 0 0015.34 2.87c5 0 8.77-.77 11.36-2.29A8.11 8.11 0 00572.24 89q-2.39-2.24-11.19-5.29-21.77-7.64-30-15.63t-8.15-20.37q0-13 10.66-21.2t27.76-8.15a73.38 73.38 0 0117.4 2.11A88.59 88.59 0 01596 26.66v20.93a115.75 115.75 0 00-18.42-7.66 50.87 50.87 0 00-14.84-2.49c-4.85 0-8.55.7-11.09 2.11a6.6 6.6 0 00-3.83 6c0 2.14 1.14 4.15 3.43 6s5.75 3.72 10.3 5.45c1 .4 2.46.94 4.45 1.67q14.58 5.41 20.9 9.25a27 27 0 0110 10.49 31.6 31.6 0 013.38 15q0 14.13-10.66 22.2T560 123.65a66.7 66.7 0 01-35.32-9.89z' class='cls-2' transform='translate(.92 .2)'/%3E%3Cpath fill='%23fff' fill-rule='evenodd' d='M107.25 99.52H75.34v57.39H48.93c0-24.25-.27-48.55-.27-72.77 0-26.67 24.18-48.17 51.94-48.28h50V62.7H89.87c-6 1-9.87 5.11-11 11.89l46.56.44c-.24 11.73-5.75 20.23-18.18 24.49z' transform='translate(.92 .2)'/%3E%3C/svg%3E"
              />
              </a>
        <!-- navigation -->
        <div class="row justifu-center my-main-menu">
          <q-tabs class=" row wrap justifu-center">
              <q-route-tab to="/" label="HOME" icon="fas fa-home"/>
              <q-route-tab to="/users" label="USERS" icon="fas fa-users"/>
              <q-route-tab to="/posts" label="POSTS" icon="fas fa-file-alt"/>
          </q-tabs>
        </div>
        <!-- login / registration -->
        <q-tabs class="my-auth justify-end" v-if="!isAuthenticated">
            <q-route-tab  to="/login" label="LOG IN" icon="fas fa-sign-in-alt" class="my-auth-btn__login" />
            <q-route-tab to="/user-new" label="REGISTRATION" icon="fas fa-user-plus" class="my-auth-btn__reg" />
         </q-tabs>
        <!-- user menu -->
        <div class="user-control" v-if="isAuthenticated">
          <q-btn-dropdown class="my-user-menu" stretch flat icon="img:data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0iaXNvLTg4NTktMSI/Pg0KPCEtLSBHZW5lcmF0b3I6IEFkb2JlIElsbHVzdHJhdG9yIDE5LjAuMCwgU1ZHIEV4cG9ydCBQbHVnLUluIC4gU1ZHIFZlcnNpb246IDYuMDAgQnVpbGQgMCkgIC0tPg0KPHN2ZyB2ZXJzaW9uPSIxLjEiIGlkPSJMYXllcl8xIiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHhtbG5zOnhsaW5rPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5L3hsaW5rIiB4PSIwcHgiIHk9IjBweCINCgkgdmlld0JveD0iMCAwIDUwOCA1MDgiIHN0eWxlPSJlbmFibGUtYmFja2dyb3VuZDpuZXcgMCAwIDUwOCA1MDg7IiB4bWw6c3BhY2U9InByZXNlcnZlIj4NCjxjaXJjbGUgc3R5bGU9ImZpbGw6IzkwREZBQTsiIGN4PSIyNTQiIGN5PSIyNTQiIHI9IjI1NCIvPg0KPGc+DQoJPHBhdGggc3R5bGU9ImZpbGw6I0U2RTlFRTsiIGQ9Ik0yNTUuMiwzNjMuMmMtMC40LDAtMC44LDAuNC0xLjYsMC40Yy0wLjQsMC0wLjgtMC40LTEuNi0wLjRIMjU1LjJ6Ii8+DQoJPHBhdGggc3R5bGU9ImZpbGw6I0U2RTlFRTsiIGQ9Ik00NTguNCw0MDRjLTQ2LDYyLjgtMTIwLjgsMTA0LTIwNC44LDEwNFM5NS4yLDQ2Ny4yLDQ4LjgsNDA0YzM2LTM4LjQsODQuOC01OC44LDEyNS42LTY5LjINCgkJYy0zLjYsMjkuMiwxMS42LDY4LjQsMTIsNjcuMmMxNS4yLTM1LjIsNjYuOC0zOC40LDY2LjgtMzguNHM1MS42LDIuOCw2Ny4yLDM4LjRjMC40LDAuOCwxNS42LTM4LDEyLTY3LjINCgkJQzM3My42LDM0NS4yLDQyMi40LDM2NS42LDQ1OC40LDQwNHoiLz4NCjwvZz4NCjxwYXRoIHN0eWxlPSJmaWxsOiNGRkQwNUI7IiBkPSJNMzE2LjgsMzA4TDMxNi44LDMwOGMwLDUuMi0zLjIsMzIuOC02MS42LDU1LjJIMjUyYy01OC40LTIyLjQtNjEuNi01MC02MS42LTU1LjJsMCwwDQoJYzAuNC0xMC40LDIuOC0yMC44LDcuMi0zMC40YzE2LDE4LDM1LjIsMzAsNTYsMzBjMjAuNCwwLDQwLTExLjYsNTYtMzBDMzE0LDI4Ny4yLDMxNi44LDI5Ny42LDMxNi44LDMwOHoiLz4NCjxwYXRoIHN0eWxlPSJmaWxsOiNGMTU0M0Y7IiBkPSJNMjg4LjQsMzcyLjRMMjc1LjYsMzk4aC00NGwtMTIuOC0yNS42YzE3LjYtNy42LDM0LjgtOC44LDM0LjgtOC44UzI3MS4yLDM2NC44LDI4OC40LDM3Mi40eiIvPg0KPHBhdGggc3R5bGU9ImZpbGw6I0ZGNzA1ODsiIGQ9Ik0yMTgsNTA1LjZjMTEuNiwxLjYsMjMuNiwyLjQsMzYsMi40YzEyLDAsMjQtMC44LDM2LTIuNGwtMTQtMTA3LjJoLTQ0TDIxOCw1MDUuNnoiLz4NCjxnPg0KCTxwYXRoIHN0eWxlPSJmaWxsOiNGRkZGRkY7IiBkPSJNMzE2LjgsMzA3LjJjMCwwLDIuOCwzMi02My4yLDU2LjRjMCwwLDUxLjYsMi44LDY3LjIsMzguNEMzMjEuMiw0MDMuNiwzNTEuMiwzMjYsMzE2LjgsMzA3LjJ6Ii8+DQoJPHBhdGggc3R5bGU9ImZpbGw6I0ZGRkZGRjsiIGQ9Ik0xOTAuNCwzMDcuMmMtMzQsMTguOC00LjQsOTYtMy42LDk0LjhjMTUuMi0zNS4yLDY3LjItMzguNCw2Ny4yLTM4LjQNCgkJQzE4Ny42LDMzOS4yLDE5MC40LDMwNy4yLDE5MC40LDMwNy4yeiIvPg0KPC9nPg0KPHBhdGggc3R5bGU9ImZpbGw6I0Y5QjU0QzsiIGQ9Ik0zMTIuOCwyODUuNmMtMTYuOCwxOC0zNi44LDI5LjYtNTkuMiwyOS42cy00Mi40LTExLjYtNTkuMi0yOS42YzAuOC0yLjgsMi01LjYsMy4yLTgNCgljMTYsMTgsMzUuMiwzMCw1NiwzMHM0MC0xMS42LDU2LTMwQzMxMC44LDI4MCwzMTIsMjgyLjgsMzEyLjgsMjg1LjZ6Ii8+DQo8cGF0aCBzdHlsZT0iZmlsbDojRkZEMDVCOyIgZD0iTTM2Mi44LDIyNC40Yy04LjQsMTQtMjEuMiwyMi40LTMwLjgsMjAuOGMtMTkuMiwzNS42LTQ3LjIsNjItNzguNCw2MnMtNTkuMi0yNi44LTc4LjQtNjINCgljLTkuNiwxLjItMjIuNC02LjgtMzAuOC0yMC44Yy0xMC0xNi40LTEwLjQtMzQuNC0wLjgtNDAuNGMyLjQtMS4yLDQuOC0yLDcuNi0xLjZjNi40LDE2LjQsMTUuMiwyNi40LDE1LjIsMjYuNA0KCWMtOS4yLTUwLjgsMjguNC01Ni40LDIyLTEwNS4yYzAsMCwyMy42LDUyLjQsOTEuMiwxNS42bC01LjIsMTBjOTQuNC0yMS4yLDYyLjgsOTAsNjIsOTIuOGMxMC44LTEzLjYsMTcuNi0yNy4yLDIxLjYtMzkuNg0KCWMxLjYsMCwzLjYsMC44LDQuOCwxLjZDMzczLjIsMTg5LjYsMzcyLjgsMjA4LDM2Mi44LDIyNC40eiIvPg0KPHBhdGggc3R5bGU9ImZpbGw6IzMyNEE1RTsiIGQ9Ik0zMDgsNTAuOGM3LjYtMC44LDIwLDYsMjAsNmMtMzQtMzguOC04OS42LTE0LTg5LjYtMTRjMTguOC0xNiwzNS42LTE0LjQsMzUuNi0xNC40DQoJYy03OS42LTEyLTkzLjIsMzUuNi05My4yLDM1LjZjLTMuNi01LjYtMy42LTEzLjYtMy4yLTE3LjZDMTcyLDU2LDE3OCw3NS4yLDE3OCw3NS4yYy01LjYtMTQtMjUuMi0xMS42LTI1LjItMTEuNg0KCWMxNi44LDIuOCwxOS42LDEzLjIsMTkuNiwxMy4yYy00MiwxNS42LTM0LjgsNTkuMi0zNC44LDU5LjJsMTAtMTJjLTEyLjQsNDcuNiwxOS4yLDg0LjQsMTkuMiw4NC40Yy05LjItNTAuOCwyOC40LTU2LjQsMjItMTA1LjINCgljMCwwLDIzLjYsNTIuNCw5MS4yLDE1LjZsLTUuMiwxMGM5NS42LTIxLjYsNjIsOTMuMiw2Miw5My4yYzM0LTQzLjIsMjguOC04Ny42LDI4LjgtODcuNmw0LDE2QzM4MC40LDc4LjQsMzA4LDUwLjgsMzA4LDUwLjh6Ii8+DQo8Zz4NCjwvZz4NCjxnPg0KPC9nPg0KPGc+DQo8L2c+DQo8Zz4NCjwvZz4NCjxnPg0KPC9nPg0KPGc+DQo8L2c+DQo8Zz4NCjwvZz4NCjxnPg0KPC9nPg0KPGc+DQo8L2c+DQo8Zz4NCjwvZz4NCjxnPg0KPC9nPg0KPGc+DQo8L2c+DQo8Zz4NCjwvZz4NCjxnPg0KPC9nPg0KPGc+DQo8L2c+DQo8L3N2Zz4NCg==">
          <q-list >
            <q-item>
              <router-link :to="{ name: 'ThisUser'}"><i class="fas fa-user"></i> USER INFO</router-link>
            </q-item>
            <q-item >
              <a @click.stop="$store.dispatch('logOut')"><i class="fas fa-user"></i> LOG OUT</a>
            </q-item>
          </q-list>
        </q-btn-dropdown>
        </div>
        </div>
    </header>
</template>

<script>
import { mapGetters } from 'vuex';
export default {
    computed: {
        ...mapGetters(['isAuthenticated'])
    }
};
</script>

<style lang="scss" scoped>
  .my-header {
    background: rgba(255, 255, 255, 0.849);
    a{
      text-decoration: none;
    }
    .app-header-logo {
      flex: 0 1 160px;
      align-self: flex-start;
      padding-top: 0.5rem;
    }
    .app-header-links {
      display: flex;
      flex-shrink: 1;
      flex-wrap: wrap;
      width: 100%;
      justify-content: space-between;

      a {
        display: inline-block;
      }
      .my-main-menu {
        max-width: 300px;
        justify-content: center;
        flex-grow: 1;
      }
      .my-auth, .my-user-menu {
        display: flex;
        justify-content: flex-end;
        max-width: 300px;
        flex-grow: 1;
        flex-shrink: 1;
      }
      .my-auth {
        margin-left: auto;
      }
      .user-control {
        display: flex;
        justify-content: flex-end;
      }
    }
  }
  .my-user-menu, .user-control, .my-auth {
      margin-left: auto;
    }
  @media screen and (max-width: 670px) {
    .my-user-menu, .user-control, .my-auth {
      margin-left: auto;
    }
    .my-main-menu {
      order: 2;
      max-width: 100%;
      width: 100%;
    }
    .my-auth {
      width: 100%;
    }
  }
</style>>
