import React from "react";

const Footer = () => {
  return (
    <>
      <footer className="max-w-7xl mx-auto sm:px-16 px-6 py-2">
        <section className="flex md:flex-row flex-col justify-between items-center space-y-2">
          <div>
            <a href="https://github.com/patlepranay/developer_portfolio" target="_blank" rel="noreferrer">
              <p
                className={
                  "sm:text-[16px] text-[12px] text-secondary uppercase tracking-wider underline"
                }
              >
                Portfolio Repository
              </p>
            </a>
          </div>
          <div>
            <h2
              className={
                "sm:text-[16px] text-[12px] text-secondary uppercase tracking-wider"
              }
            >
              Designed and Developed by Pranay
            </h2>
          </div>
        </section>
      </footer>
    </>
  );
};
export default Footer;
