# LordOfCoupons Structure

## Repository Layout
- `backend/` — Spring Boot 2.6 service (Java 11 target, Docker built with JDK 17) containing API, domain logic, and the prebuilt SPA under `src/main/resources/static`.
- `frontend/` — React + TypeScript source tree (CRA-style) with components, Redux store, and API helpers; package/tsconfig files are not present in the repo snapshot.
- `.vscode/` — editor settings.

## Backend (Spring Boot)
- **Entry & config**: `backend/src/main/java/com/johnbryce/couponSystem/CouponSystemApplication.java` enables scheduling. `backend/src/main/resources/application.properties` uses an in-memory H2 DB in PostgreSQL mode on port 8080; `system.properties`, `Dockerfile`, and `Procfile` support deployment.
- **Domain model**: `beans/` holds `Company`, `Customer`, `Coupon`, base timestamps, and enums `Category`, `ClientType`. `Coupon` links to `Company`; `Customer` has many-to-many coupons.
- **DTOs & mapping**: `dto/` defines request/response shapes (e.g., `CouponDto`, `LoginReqDto`). `mappers/` convert between entities and DTOs.
- **Persistence**: `repos/` are Spring Data JPA repositories with custom queries for price/category filtering and purchase cleanup (`CouponRepository.deleteCouponPurchase`, `deleteCustomerCoupons`, etc.).
- **Services**:
  - `AdminService`, `CompanyService`, `CustomerService`, `PublicService` interfaces with `impl/` implementations encapsulate business rules (e.g., coupon ownership checks, purchase handling).
  - `utils/CouponExpirationDailyJob` scheduled task prunes expired coupons and their purchase links.
- **Authentication & tokens**: `login/LoginManager` and `login/RegManager` orchestrate login/registration per `ClientType`. `security/TokenManager` issues in-memory UUID tokens keyed by `Information` (user id/email/type) and enforces simple role checks; tokens expire after 30 minutes via scheduled cleanup. `filters/CORSFilter` allows cross-origin calls and headers.
- **Web layer**:
  - `controllers/LoginController` (`/api/users`) for login/register.
  - `controllers/PublicController` (`/api/public`) exposes public coupon browsing.
  - `controllers/CompanyController` (`/api/companies`) handles company-owned coupons (CRUD, filters) using the `Authorization` header token to derive company id.
  - `controllers/CustomerController` (`/api/customers`) manages customer purchases and filtering.
  - `controllers/AdminController` (`/admin`) manages companies/customers, guarded by `TokenManager.isAdmin`.
- **Static assets**: `src/main/resources/static/` serves the built frontend (HTML/CSS/JS and media) when the backend runs.
- **Testing**: single context load test in `src/test/java/com/johnbryce/couponSystem/CouponSystemApplicationTests.java`; surefire is configured to skip tests by default.

## Frontend (React + TypeScript)
- **Entrypoint & layout**: `src/index.tsx` mounts `<App/>`; `Components/LayoutArea/{Header,Menu,Main,Footer}` compose the shell. Global styles in `src/index.css` and `App.css`.
- **Routing**: `Components/SharedArea/Routing/Routing.tsx` (React Router v6) maps paths for public coupons, auth, admin company/customer management, company coupon CRUD, customer purchases, and static pages (home/about/credits/404).
- **State management**: Redux store at `Redux/store.ts` combines `AuthAppState`, `CouponsAppState`, `CompaniesAppState`, `CustomersAppState`. `AuthAppState` persists the logged-in `UserModel` to `localStorage`.
- **API layer**: `Services/Globals.ts` defines base URLs; `Services/InterceptorAxios.ts` injects the stored `Authorization` token header; `WebApi/*.ts` modules wrap backend endpoints for users, admin, companies, customers, and public browsing. `Services/Notifications.ts` wraps Notyf for success/error messaging.
- **Domain models**: `Models/` contains TypeScript models for users, credentials, register payloads, coupons, companies, customers, and enums like `Category`.
- **Components**:
  - `AuthArea/` for login/register/logout and menu.
  - `CouponArea/` for listing, adding, editing, deleting, purchasing coupons (company vs. customer views) plus total counters and public views.
  - `CompanyArea/` and `CustomerArea/` for admin CRUD on companies/customers.
  - `SharedArea/` utility UI (routing wrapper, clock/date, dark mode toggle, profile menu, flip card, empty view, social links, logo).
  - `LayoutArea/` for header/menu/main/footer containers; `PagesArea/` for home/about/credits/404 pages.
- **Assets**: `Assets/` holds themed images (including Lord of the Rings art) and the custom `RINGM___.TTF` font used across UI backgrounds/cards.
- **Testing**: CRA defaults exist (`App.test.tsx`, `setupTests.ts`, `reportWebVitals.ts`) but no custom tests are added.

## Data Flow & Integration
- **Auth**: Users login via `POST /api/users/login` receiving a UUID token and client type; the token is stored in Redux/localStorage and sent as `Authorization` by Axios interceptor. Backend `TokenManager` uses the token to derive the acting user/role for protected routes.
- **Public browsing**: `GET /api/public` (optionally by category or max price) feeds the public coupon list and landing page tiles.
- **Company workflow**: Authenticated companies manage their coupons (`/api/companies` CRUD, category/price filters). Deletion also clears purchases via repository helpers.
- **Customer workflow**: Authenticated customers view/purchase/delete owned coupons (`/api/customers/coupons` variants) with server-side ownership enforcement.
- **Admin workflow**: Admin manages companies/customers via `/admin` endpoints; default credentials are checked in `AdminServiceImpl.login`.
- **Serving the SPA**: Running the Spring Boot app serves the bundled frontend from `backend/src/main/resources/static` while also exposing REST APIs on the same origin.
