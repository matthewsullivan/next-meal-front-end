import { html, PolymerElement } from "@polymer/polymer/polymer-element.js";

import "@polymer/iron-flex-layout/iron-flex-layout";
import "@polymer/iron-icon/iron-icon";
import "@polymer/iron-icons/iron-icons";

import "@polymer/paper-icon-button/paper-icon-button";
import "@polymer/paper-card/paper-card";
import "@polymer/paper-checkbox/paper-checkbox";
import "@polymer/paper-input/paper-input";

/**
 * @customElement
 * @polymer
 */
class NextMealApp extends PolymerElement {
  static get template() {
    return html`
      <style>
        :host {
          display: block;
          background: url(images/background.jpg);
          background-position: center;
          background-repeat: no-repeat;
          background-size: cover;
          @apply --layout-center;
          @apply --layout-center-justified;
          @apply --layout-fit;
          @apply --layout-vertical;
        }

        .location {
          width: calc(100% - 16px);
        }

        .location__checkbox {
          margin-top: 16px;
        }

        @media only screen and (min-width: 640px) {
          .location {
            width: 40%;
          }
        }
      </style>

      <paper-card class="location">
        <div class="card-content">
          <paper-input label="Type your location">
            <paper-icon-button
              class="location__button"
              disabled$="[[_noLocationSet]]"
              icon="icons:arrow-forward"
              on-tap="_handleLocationSubmit"
              slot="suffix"
            ></paper-icon-button>
          </paper-input>
          <paper-checkbox checked class="location__checkbox"
            >Remember me</paper-checkbox
          >
        </div>
      </paper-card>
    `;
  }
  static get properties() {
    return {
      _noLocationSet: {
        type: Boolean,
        value: true
      }
    };
  }

  /**
   * Handle Location Submit
   * @param {objext} event
   */
  _handleLocationSubmit(event) {
    console.log(event);
  }
}

window.customElements.define("next-meal-app", NextMealApp);
