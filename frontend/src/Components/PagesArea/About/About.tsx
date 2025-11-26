import "./About.css";

function About(): JSX.Element {
    return (
        <div className="About">
            <div className="About-description">
                <h1>About LordOfCoupons</h1>
                <p>
                    LordOfCoupons is a full-stack coupon marketplace where admins onboard companies and customers, companies publish and maintain coupons, and customers browse and purchase deals. The backend is a Spring Boot service exposing REST APIs secured with token-based auth, backed by JPA/H2 with scheduled cleanup for expired coupons.
                </p>
                <p>
                    The backend layers include DTO mappers, service interfaces with role-specific implementations, JPA repositories for company/customer/coupon persistence, and token utilities that expire sessions after 30 minutes. Controllers expose routes for login/register, public coupon browsing with filters, and role-gated operations for companies, customers, and admins.
                </p>
                <p>
                    The frontend is a React + TypeScript SPA that uses Redux slices for auth and domain state, Axios with an interceptor to inject the token, and a Notyf wrapper for notifications. Routing (React Router v6) drives public browsing, company CRUD, customer purchases, admin panels, and static pages. Shared components like flip cards, headers, filters, and empty states keep the UI cohesive.
                </p>
                <p>
                    Data flows from the REST API through typed WebApi helpers and Redux actions into UI components. Public and customer coupon lists support category and price filters with animated flip cards. Admin panels manage companies and customers, while companies maintain coupons with validation and ownership checks enforced server-side.
                </p>
                <p>
                    Deployment serves the bundled SPA from <code>backend/src/main/resources/static</code> alongside the API. Tooling includes CRA-style build scripts, a Dockerfile, Procfile, and Heroku-style settings.
                </p>
            </div>
            <div className="About-quotes">
                <div className="phrase-box">
                    <h2>"All we have to decide is what to do with the time that is given us."</h2>
                    <p>- J.R.R. Tolkien, The Fellowship of the Ring</p>
                </div>
                <div className="phrase-box">
                    <h2>"The wise speak only of what they know"</h2>
                    <p>- J.R.R. Tolkien, The Two Towers</p>
                </div>
                <div className="phrase-box">
                    <h2>"It's the job that's never started as takes longest to finish."</h2>
                    <p>- J.R.R. Tolkien, The Lord of the Rings</p>
                </div>
            </div>
        </div>
    );
}

export default About;
