import React, { useCallback, useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { HashLink } from 'react-router-hash-link';
import { I18n } from 'react-i18next';

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import Support from './Support/Support';
import { loadAuth, loadUserDetails, showSupportModal } from 'Actions';

import styles from './Header.scss';

const Header = props => {
  const [, setShowNavbar] = useState(false);

  useEffect(() => {
    props.loadAuth();
  }, []);

  useEffect(() => {
    if (props.auth && props.auth.token && props.auth.token.access_token) {
      if (!props.auth.profile) {
        props.loadUserDetails();
      }
    }
  }, [props.auth]);

  const closeNavbar = useCallback(() => {
    setShowNavbar(false);
  }, [setShowNavbar]);

  const hideSupport = useCallback(() => {
    props.showSupportModal(false);
  }, [props.supportModal]);

  return (
    <HeaderStuff
      {...{
        auth: props.auth,
        supportModal: props.supportModal,
        showSupportModal: props.showSupportModal,

        closeNavbar,
        hideSupport,
      }}
    />
  );
};

export const HeaderStuff = props => {
  const { closeNavbar, hideSupport, supportModal } = props;

  return (
    <I18n ns="translations">
      {t => (
        <div className={styles.header} data-test="header">
          <div className="container">
            <div className="navbar-header">
              <button type="button" className="navbar-toggle" data-toggle="collapse" data-target="#navigation-index">
                <span className="sr-only">Toggle navigation</span>
                <span className="icon-bar" />
                <span className="icon-bar" />
                <span className="icon-bar" />
              </button>

              <Link to="/">
                <div className={styles['logo-container']}>
                  <img src="/img/logo.svg" alt="Logo" data-test="logo" />
                </div>
              </Link>
            </div>

            <div className="collapse navbar-collapse" id="navigation-index">
              <ul className="nav navbar-nav navbar-right">
                {/* <li>
                  <HashLink smooth onClick={() => closeNavbar()} to="/#about" className={styles.link}>
                    {t('header.about')}
                  </HashLink>
                </li> */}

                <li>
                  <Link onClick={() => closeNavbar()} to="/faqs" className={styles.link} data-test="faq-btn">
                    {t('header.faq')}
                  </Link>
                </li>

                {/* <li>
                  <Link onClick={() => closeNavbar()} to="/pricecomparsion" className={styles.link} data-test="pricecomparsion-btn">
                    {t('header.pricecomparsion')}
                  </Link>
                </li>

                <li>
                  <Link onClick={() => closeNavbar()} to="/team" className={styles.link} data-test="pricecomparsion-btn">
                    {t('header.team')}
                  </Link>
                </li> */}

                {/* <li>
                  <a
                    className={`${styles.link} hidden-sm hidden-md`}
                    href="http://docs.nexchange2.apiary.io/"
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={() => window.gtag('event', 'API open', { event_category: 'API', event_label: `` })}
                    data-test="api-link"
                  >
                    {t('header.apidocs')}
                  </a>
                </li> */}

                {/* <li>
                  <Link onClick={() => this.closeNavbar()} to="/#compare" className={`${styles.link} hidden-sm`} data-test="compare-link">
                      {t('header.compare')}
                  </Link>
                </li> */}

                <li>
                  <Link
                    onClick={() => {
                      closeNavbar();
                      props.showSupportModal(true);
                    }}
                    className={styles.link}
                    to="#"
                    data-test="support-btn"
                  >
                    {t('header.support')}
                  </Link>
                </li>

                <li id="social-mobile">
                  <a
                    href="/twitter"
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`${styles.social} btn btn-simple btn-just-icon visible-xs`}
                  >
                    <i className="fab fa-twitter" aria-hidden="true" />
                  </a>

                  <a
                    href="/fb"
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`${styles.social} btn btn-simple btn-just-icon visible-xs`}
                  >
                    <i className="fab fa-facebook-f" aria-hidden="true" />
                  </a>

                  <a
                    href="/youtube"
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`${styles.social} btn btn-simple btn-just-icon visible-xs`}
                  >
                    <i className="fab fa-youtube" aria-hidden="true" />
                  </a>

                  <a
                    href="/slack"
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`${styles.social} btn btn-simple btn-just-icon visible-xs`}
                  >
                    <i className="fab fa-slack-hash" aria-hidden="true" />
                  </a>

                  <a
                    href="/telegram"
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`${styles.social} btn btn-simple btn-just-icon visible-xs`}
                  >
                    <i className="fab fa-telegram" aria-hidden="true" />
                  </a>
                </li>

                <li className="visible-md visible-lg social-desktop">
                  <a
                    href="/twitter"
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`${styles.social} btn btn-simple btn-just-icon`}
                    title={t('header.twitter')}
                    data-toggle="tooltip"
                    data-placement="bottom"
                  >
                    <i className="fab fa-twitter" aria-hidden="true" />
                  </a>
                </li>

                <li className="visible-md visible-lg social-desktop">
                  <a
                    href="/youtube"
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`${styles.social} btn btn-simple btn-just-icon`}
                    title={t('header.youtube')}
                    data-toggle="tooltip"
                    data-placement="bottom"
                  >
                    <i className="fab fa-youtube" aria-hidden="true" />
                  </a>
                </li>

                <li className="visible-md visible-lg social-desktop">
                  <a
                    href="/fb"
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`${styles.social} btn btn-simple btn-just-icon`}
                    title={t('header.facebook')}
                    data-toggle="tooltip"
                    data-placement="bottom"
                  >
                    <i className="fab fa-facebook-f" aria-hidden="true" />
                  </a>
                </li>

                <li className="visible-md visible-lg social-desktop">
                  <a
                    href="/slack"
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`${styles.social} btn btn-simple btn-just-icon`}
                    title={t('header.slack')}
                    data-toggle="tooltip"
                    data-placement="bottom"
                  >
                    <i className="fab fa-slack-hash" aria-hidden="true" />
                  </a>
                </li>

                <li className="visible-md visible-lg social-desktop">
                  <a
                    href="/telegram"
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`${styles.social} btn btn-simple btn-just-icon`}
                    title={t('header.telegram')}
                    data-toggle="tooltip"
                    data-placement="bottom"
                  >
                    <i className="fab fa-telegram" aria-hidden="true" />
                  </a>
                </li>
              </ul>
            </div>

            <Support show={supportModal} onClose={() => hideSupport()} />
          </div>
        </div>
      )}
    </I18n>
  );
};

const mapStateToProps = ({ auth, supportModal }) => ({ auth, supportModal });
const mapDispatchToProps = dispatch => bindActionCreators({ loadAuth, loadUserDetails, showSupportModal }, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(Header);
