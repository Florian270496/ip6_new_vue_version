<template>
  <div class="hazard-table">
    <v-app id="inspire">
      <v-text-field
          append-icon="search"
          append-outer-icon="red"
          v-model="search"
          label="Suchen"
          single-line
          hide-details>
      </v-text-field>
      <v-data-table
          :headers="hazardsHeader"
          :items="hazardsSliced"
          :search="search"
          :sort-by.sync="sortBy"
          :sort-desc.sync="sortDesc"
          :expanded.sync="expanded"
          :single-expand="true"
          :footer-props="{
              showFirstLastPage: true,
              'items-per-page-text':'Gefährdungen pro Seite',
              'items-per-page-all-text':'Alle', }"
          show-expand
          class="elevation-1"
          no-results-text="Keine übereinstimmenden Daten gefunden."
          no-data-text="Keine Daten gefunden">

        <!--icon-->
        <template v-slot:item.icon="{item}">
          <img class="hazard-table__hazard-icon" :src="`${item.imageName}`" alt="icon"/>
        </template>

        <!-- riskPriority-number -->
        <template v-slot:item.riskPriority="{ item }">
          <div v-if="item.riskPriority === '1 gering'" :class="`dot green-customized`"></div>
          <div v-if="item.riskPriority === '2 mittel'" :class="`dot yellow-customized`"></div>
          <div v-if="item.riskPriority === '3 hoch'" :class="`dot red-customized`"></div>
        </template>

        <!-- checkbox -->
        <template v-slot:item.notApplicable="{item}">
          <input :id="`confirm${item.id}`" :ref="`confirm${item.id}`"
                 @click="numberOfCheckedCheckboxes(item.id, false, false, false)"
                 type="checkbox" :checked="itemIdPartOfCheckedCheckboxesArray(item.id)"/>
          <label class="checkbox" :for="`confirm${item.id}`"></label>
        </template>

        <!-- checkmark -->
        <template v-slot:item.accepted="{item}">
          <div ref="submit" :id="`acceptedDiv${item.id}`"
               class="tooltip tooltip--expand"
               data-title="Akzeptiert-Status wird automatisch bei Verifizierung des Custom Made Devices gesetzt."
               @click="moveCheckmark(item.id, 'acceptedDiv', 'apply-shake', 820)">
            <svg class="hazard-table__accepted-status" :id="`accepted${item.id}`" width="17" height="15"
                 viewBox="0 0 17 15"
                 fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M16 1L5.6875 14L1 8.09091" stroke="#4C5A69" stroke-width="1.5" stroke-linecap="round"
                    stroke-linejoin="round"
                    :stroke-opacity="itemIdPartOfAcceptArray(item.id, 'checkedCheckboxesArray', '1.0', '0.2')"
              />
            </svg>
          </div>
        </template>

        <!--Expanded informations-->
        <template v-slot:expanded-item="{ headers, item }">
          <td class="hazard-table__detail-view detail-view" :colspan="headers.length ">
            <form class="form-detail-view">

              <div class="detail-view__groups detail-view__groups--description-icon">
                <div class="detail-view__group detail-view__group--square">
                  <div class="detail-view__title detail-view__title--square"> {{ item.hazardDetailDescription }}
                  </div>
                  <div class="detail-view__content detail-view__content--square"><img :src="`${item.imageName}`"
                                                                                      width="89" height="auto">
                  </div>
                </div>
              </div>

              <div class="detail-view__groups">
                <div class="detail-view__group detail-view__group--damage">
                  <div class="detail-view__title">Schaden</div>
                  <div class="detail-view__content">
                    <ul>
                      <li v-for="damage in item.damage" :key="damage.description"><img
                          src="../../assets/svg/bullet_point.svg" alt="li-icon">
                        <p>{{ damage.description }}</p></li>
                    </ul>
                  </div>
                </div>

                <div class="detail-view__group">
                  <div class="detail-view__title">Massnahmen zur Risikominderung</div>
                  <div class="detail-view__content">
                    <ul>
                      <li v-for="measure in item.measures" :key="measure.description"><img
                          src="../../assets/svg/bullet_point.svg" alt="li-icon">
                        <p>{{ measure.description }}</p></li>
                    </ul>
                  </div>
                </div>

                <div class="detail-view__group">
                  <div class="detail-view__title">Auswirkungen der Risikominderung</div>
                  <div class="detail-view__content detail-view__content--graphic">

                    <div class="detail-view__risk-matrix">
                      <div class="detail-view__risk-matrix-title">Risikomatrix</div>
                      <div class="detail-view__risk-matrix-description">
                        <p>Veränderung des Gesamtrisikos durch getätigte Massnahmen.</p>
                      </div>
                      <RiskMatrix
                          :probabilityOfOccurrenceBeforeRiskMatrix="item.probabilityOfOccurrenceBefore"
                          :probabilityOfOccurrenceAfterRiskMatrix="item.probabilityOfOccurrenceAfter"
                          :severityRiskMatrix="item.severity"/>
                    </div>
                  </div>
                </div>

                <div class="detail-view__group">
                  <div class="detail-view__title">Bewertung</div>
                  <div class="detail-view__content detail-view__content--question">
                    <div class="detail-view__evaluation-question">Wollen Sie innerhalb der Spezifikation bleiben oder
                      ein Custom Made
                      Device herstellen?
                    </div>
                    <label class="detail-view__evaluation-answer-label radio-button-container">
                      <div class="detail-view__evaluation-answer-text"> Spezifikation</div>
                      <input type="radio" :name="`evaluation`" :value="`Spezifikation`"
                             v-model="specification_customMadeDevice">
                      <span class="radio-button-container__button"></span>
                    </label>
                    <label class="detail-view__evaluation-answer-label radio-button-container">
                      <div class="detail-view__evaluation-answer-text"> Custom Made Device</div>
                      <input type="radio" :name="`evaluation`" :value="`CustomMadeDevice`"
                             v-model="specification_customMadeDevice">
                      <span class="radio-button-container__button"></span>
                    </label>
                  </div>
                </div>

                <!--Nachbearbeitung (in Spezifikation bleiben) -->
                <div v-if="specification_customMadeDevice === 'Spezifikation'">
                  <div class="detail-view__group">
                    <div class="detail-view__title">Nachbearbeitung</div>
                    <div class="detail-view__content detail-view__content--question">
                      <div class="detail-view__evaluation-question">Ist eine Nachbearbeitung des Devices möglich?</div>
                      <label class="detail-view__evaluation-answer-label radio-button-container">
                        <div class="detail-view__evaluation-answer-text"> Ja</div>
                        <input :name="`postPrcessing`" type="radio" :value="`yes`"
                               v-model="postProcessingPossibility">
                        <span class="radio-button-container__button"></span>
                      </label>
                      <label class="detail-view__evaluation-answer-label radio-button-container">
                        <div class="detail-view__evaluation-answer-text"> Nein</div>
                        <input :name="`postPrcessing`" type="radio" :value="`no`"
                               v-model="postProcessingPossibility">
                        <span class="radio-button-container__button"></span>
                      </label>
                    </div>
                  </div>

                  <!--Nachbearbeitung JA-->
                  <div v-if="postProcessingPossibility === 'yes'">
                    <div class="detail-view__group">
                      <div class="detail-view__notification">
                        Die Herstellung des Devices ist durch die Nachbearbeitung weiterhin möglich.
                        Fügen Sie zusätzliche Gefährdungen hinzu oder schliessen Sie diese Gefährdung direkt ab.
                      </div>
                    </div>
                    <div class="button-container detail-view__button-container">
                      <router-link
                          :to="{ name: 'NewHazard', params: { actualTitleNameNewHazard: actualTitleNameTable, itemIdNewHazard: item.id, acceptArrayLengthNewHazard : acceptArray.length }}">
                        <button class="button button--cancel button--detail-view button--detail-view-cancel">Gefährdung
                          erstellen
                        </button>
                      </router-link>
                      <input @click="numberOfCheckedCheckboxes(item.id, false, true, false)"
                             class="button button--submit button--detail-view button--detail-view-submit"
                             id="btn"
                             type="submit" value="Gefährdung abschliessen">
                    </div>
                  </div>

                  <!--Nachbearbeitung NEIN-->
                  <div v-if="postProcessingPossibility === 'no'">
                    <div class="detail-view__group">
                      <div class="detail-view__notification">Die Herstellung des Devices muss abgebrochen werden.</div>
                    </div>
                    <div class="button-container detail-view__button-container">
                      <button @click.prevent="showModal = true"
                              class="button button--cancel button--detail-view button--detail-view-cancel">Herstellung
                        abbrechen
                      </button>
                    </div>
                  </div>
                </div>
              </div>

              <!--Custom Made Device (bewusst ausserhalb Spezifikation) -->
              <div class="detail-view__groups detail-view__groups--made-device"
                   v-if="specification_customMadeDevice === 'CustomMadeDevice'">
                <v-textarea
                    outlined
                    label="Begründung für Custom Made Device"
                    placeholder="Geben Sie eine Erläuterung ein."
                    class="detail-view__group textarea-declaration"
                    rows="2"
                    aria-required="true"
                    v-model="customMadeDeviceDescription"/>
                <div class="detail-view__group">
                  <div class="detail-view__title">Arztnachweis</div>
                  <div class="detail-view__content">
                    <input class=" inputfile" type="file" name="file" id="file"/>
                  </div>
                </div>
                <div class="button-container detail-view__button-container">
                  <input @click="accept(item.id)"
                         class="button button--submit button--detail-view button--detail-view-submit" type="submit"
                         :id="`customMadeDeviceSubmit${item.id}`"
                         :disabled="checkCustomMadeDeviceFields(item.id)"
                         value="Gefährdung abschliessen">
                </div>
              </div>

            </form>
          </td>
        </template>
      </v-data-table>

      <!-- Modal -->
      <div v-if="showModal" class="modal" @click="showModal = false">
        <!-- Modal content -->
        <div class="modal__content" @click.stop="showModal = true">
          <div class="modal__close-span">

            <span class="modal__close" @click.stop="showModal = false">

              <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                <g clip-path="url(#clip0_2133_82506)">
                <path class="modal__close-svg-path"
                      d="M1.51672 15.8995C1.12445 15.9223 0.738661 15.7919 0.440711 15.5358C-0.146904 14.9447 -0.146904 13.99 0.440711 13.3989L13.3076 0.532C13.9187 -0.0398937 14.8778 -0.00810247 15.4496 0.603069C15.9668 1.15575 15.9969 2.00523 15.5202 2.59314L2.57757 15.5358C2.28346 15.7882 1.90386 15.9184 1.51672 15.8995V15.8995Z"
                      fill="white"/>
                <path class="modal__close-svg-path"
                      d="M14.3684 15.8995C13.9708 15.8978 13.5898 15.74 13.3075 15.4601L0.440589 2.59313C-0.103806 1.9574 -0.0297926 1.00067 0.605934 0.456224C1.17334 -0.0296787 2.01014 -0.0296787 2.57749 0.456224L15.5201 13.3231C16.1312 13.8951 16.1628 14.8542 15.5907 15.4652C15.568 15.4895 15.5445 15.5131 15.5201 15.5358C15.2032 15.8114 14.7862 15.9431 14.3684 15.8995V15.8995Z"
                      fill="white"/>
                </g>
                <defs>
                <clipPath id="clip0_2133_82506">
                <rect width="16" height="16" fill="white"/>
                </clipPath>
                </defs>
              </svg>
            </span>
          </div>
          <div class="modal__inner-part">
            <div class="modal__inner-top-part">
              <div class="modal__text">
                <div class="modal__text-row"> Möchten Sie Herstellung des Devices wirklich abbrechen?</div>
                <div class="modal__text-row">Der aktuelle Fortschritt wird dabei zurückgesetzt.</div>
              </div>
            </div>

            <div class="modal__icon-box">
              <div class="modal__icon">
                <svg width="75" height="75" viewBox="0 0 75 75" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <g clip-path="url(#clip0_2208_82587)">
                    <path d="M75 37.4998C75 19.4892 60.402 4.89111 42.3913 4.89111C24.8235 4.89111 10.5053 18.7806 9.81153 36.178L5.5667 31.9331C4.29331 30.6598 2.22862 30.6598 0.95508 31.9331C-0.318309 33.2065 -0.318309 35.2712 0.95508 36.5448L10.7377 46.3274C12.0111 47.6008 14.0758 47.6008 15.3494 46.3274L25.132 36.5448C26.4054 35.2714 26.4054 33.2067 25.132 31.9331C23.8586 30.6598 21.7939 30.6598 20.5204 31.9331L16.3412 36.1123C17.0624 22.3488 28.448 11.4129 42.3914 11.4129C56.8002 11.4129 68.4784 23.0911 68.4784 37.4998C68.4784 37.5685 68.4812 37.6365 68.4854 37.704C68.48 37.7738 68.4731 37.8431 68.4719 37.9142C68.4426 39.8544 68.198 41.7849 67.7448 43.6566C67.3241 45.4077 68.4035 47.1685 70.1546 47.5892C70.4123 47.6512 70.6666 47.6805 70.9209 47.6805C72.3916 47.6805 73.7252 46.6762 74.0871 45.1827C74.6512 42.8478 74.9545 40.438 74.9937 38.0153C74.995 37.9343 74.9924 37.8543 74.9879 37.7746C74.9952 37.684 75 37.5926 75 37.4998Z" fill="#32404F"/>
                    <path d="M67.2229 53.4718C65.8239 52.3338 63.7729 52.5522 62.638 53.9511C61.425 55.4445 60.0391 56.8109 58.5163 58.0077C57.1011 59.1197 56.8597 61.1708 57.9684 62.586C58.6141 63.4045 59.5695 63.8317 60.5347 63.8317C61.239 63.8317 61.9531 63.6034 62.5499 63.1338C64.4509 61.637 66.1857 59.9284 67.702 58.0599C68.837 56.6609 68.6218 54.6066 67.2229 53.4718Z" fill="#32404F"/>
                    <path d="M48.1434 62.9511C46.2684 63.3718 44.3347 63.587 42.3913 63.587C40.588 63.587 39.1304 65.0479 39.1304 66.8479C39.1304 68.6479 40.588 70.1088 42.3913 70.1088C44.8141 70.1088 47.2304 69.8415 49.575 69.3131C51.3327 68.9185 52.4348 67.174 52.0402 65.4163C51.6456 63.6586 49.8913 62.5631 48.1434 62.9511Z" fill="#32404F"/>
                  </g>
                </svg>
              </div>
            </div>

            <div class="modal__button-container">
              <button @click.stop="showModal = false" class="button button--cancel">Herstellung
                fortsetzen
              </button>
              <button @click.stop="showModal = false; cancel()"
                      class="button button--submit button--submit-modal">
                Herstellung
                abbrechen
              </button>
            </div>
          </div>
        </div>
      </div>

    </v-app>
    <div id="toast">
      <div id="toast__message">{{ toastMessage }}</div>
    </div>
  </div>
</template>

<script>
import RiskMatrix from "@/components/listView/RiskMatrix"

export default {
  components: {
    RiskMatrix,
  },
  props: ['actualTitleNameTable', 'nameCounterTable', 'hazardNameListView'],
  data() {
    return {
      showModal: false,
      hazardNameTable: '',
      hazardSituationTable: '',
      hazardDamageTable: '',
      hazardProbabilityOfOccurenceBeforeTable: '',
      hazardSeverityTable: '',
      hazardMeasuresTable: '',
      hazardProbabilityOfOccurenceAfterTable: '',
      hazardRiskPriorityTableNumber: '',
      hazardRiskPriorityWord: '',
      hazardNewId: null,
      hazardImageNameTable: '',
      hazardOriginalIdTableNumber: null,
      customMadeDeviceDescription: '',
      customMadeDeviceFile: '',
      customMadeDeviceDocument: '',
      toastMessage: 'Gefährdung wurde erfolgreich hinzugefügt.',
      idOfFirstElementActualCategory: 0,
      idOfLastElementActualCategory: 0,
      numberOfCurrentCheckboxes: 0,
      numberOfCheckedCheckboxesValue: 0,
      acceptCounter: 0,
      checkedCheckboxesArray: [],
      acceptArray: [],
      sortBy: 'riskPriority',
      sortDesc: true,
      specification_customMadeDevice: null,
      postProcessingPossibility: null,
      search: '',
      expanded: [],
      singleExpand: false,
      hazardsHeader: [
        {text: 'Icon', value: 'icon', sortable: false},
        {text: 'Risikopriorität', value: 'riskPriority', sortable: true},
        {text: 'Definition Gefährdung', value: 'name', sortable: true},
        {text: 'Nicht zutreffend', value: 'notApplicable', sortable: true},
        {text: 'Akzeptiert', value: 'accepted', sortable: true},
        {text: 'Gefährdung verifizieren', value: 'data-table-expand'},
      ],
      hazards: [
        {
          id: 1,
          categoryId: 1,
          name: "Designvorgabe Mindestdicke kann nicht eingehalten werden. - Dicke des Implantsts zu dünn.",
          imageName: require('../../assets/svg/table_icons/toThin.svg'),
          riskPriority: "2 mittel",
          notApplicable: false,
          accepted: false,
          hazardDetailDescription: "Implantat bricht aufgrund der zu kleinen Mindestdicke.",
          damage: [
            {description: 'Zweitoperation'},
          ],
          probabilityOfOccurrenceBefore: 3,
          severity: 3,
          measures: [
            {description: 'Erfüllen der Belastungstests (DFMEA-D16).'},
          ],
          probabilityOfOccurrenceAfter: 2,
        },
        {
          id: 2,
          categoryId: 1,
          name: "Designvorgabe Mindestdicke kann nicht eingehalten werden. - Implantat nicht formstabil.",
          imageName: require('../../assets/svg/table_icons/dimensionally_unstable.svg'),
          riskPriority: "2 mittel",
          notApplicable: false,
          accepted: false,
          hazardDetailDescription: "Implantat bleibt nicht formstabil bei der Implantierung was zu einer schlechten Passgenauigkeit führt.",
          damage: [
            {description: 'Schädigung der Weichteile / Sehnervs'},
          ],
          probabilityOfOccurrenceBefore: 3,
          severity: 4,
          measures: [
            {description: 'Erfüllen der Belastungstests (DFMEA-D16).'},
          ],
          probabilityOfOccurrenceAfter: 2,
        },
        {
          id: 3,
          categoryId: 1,
          name: "Designvorgabe Anzahl Schraubenlöcher kann nicht eingehalten werden.",
          imageName: require('../../assets/svg/table_icons/nut.svg'),
          riskPriority: "2 mittel",
          notApplicable: false,
          accepted: false,
          hazardDetailDescription: "Implantat löst sich nach der Implantation unter Last, aufgrund ungenügender Verankerung.",
          damage: [
            {description: 'Schädigung der Weichteile / Sehnervs'},
          ],
          probabilityOfOccurrenceBefore: 3,
          severity: 4,
          measures: [
            {description: 'Einen Standardschraubentyp aus ähnlichen Indikationen verwenden  und unter Belastung testen  (DFMEA-D14).'},
          ],
          probabilityOfOccurrenceAfter: 1,
        },
        {
          id: 4,
          categoryId: 1,
          name: "Designvorgabe Platzierung der Schraubenlöcher kann nicht eingehalten werden.",
          imageName: require('../../assets/svg/table_icons/nut.svg'),
          riskPriority: "2 mittel",
          notApplicable: false,
          accepted: false,
          hazardDetailDescription: "Implantat bricht aufgrund der zu nahen Schrauben am Implantatrand.",
          damage: [
            {description: 'Zweitoperation'},
          ],
          probabilityOfOccurrenceBefore: 3,
          severity: 3,
          measures: [
            {description: 'Erfüllen der Belastungstests (DFMEA-D16).'},
          ],
          probabilityOfOccurrenceAfter: 1,
        },
        {
          id: 5,
          categoryId: 1,
          name: "Designvorgabee Schraubentyp/Durchmesser/Länge kann nicht eingehalten werden.",
          imageName: require('../../assets/svg/table_icons/screw.svg'),
          riskPriority: "1 gering",
          notApplicable: false,
          accepted: false,
          hazardDetailDescription: "Stabilitätsverlust bei Fixierung weil Schraubentyp und -dimension nicht zur Implantatdimension und dem zu erwartenden Lastfall passen.",
          damage: [
            {description: 'Verlängerung der OP.'},
            {description: 'Leiden des Patienten.'},
          ],
          probabilityOfOccurrenceBefore: 3,
          severity: 2,
          measures: [
            {description: 'Einen Standardschraubentyp aus ähnlichen Indikationen verwenden  und unter Belastung testen  (DFMEA-D14).'},
          ],
          probabilityOfOccurrenceAfter: 1,
        },
        {
          id: 6,
          categoryId: 2,
          name: "Bauteile können nicht diagonal zum Gasstrom auf der Bauplattform platziert werden.",
          imageName: require('../../assets/svg/table_icons/not_diagonal_placable.svg'),
          riskPriority: "2 mittel",
          notApplicable: false,
          accepted: false,
          hazardDetailDescription: "Implantat bricht durch Gefügefehler (Reduzierte mechansiche Festigkeit) aufgrund Schweissspritzer von benachbarten Bauteile.",
          damage: [
            {description: 'Zweitoperation'},
          ],
          probabilityOfOccurrenceBefore: 3,
          severity: 3,
          measures: [
            {description: 'Zum Gasstrom hin diagonale Platzierung der Implantate auf der Bauplattform gemäss SOP.'},
          ],
          probabilityOfOccurrenceAfter: 1,
        },
        {
          id: 7,
          categoryId: 2,
          name: "Verunreinigte Bauplattform.",
          imageName: require('../../assets/svg/table_icons/contaminated_building_platform.svg'),
          riskPriority: "2 mittel",
          notApplicable: false,
          accepted: false,
          hazardDetailDescription: "Verunreinigungen gelangen ins Bauteil und schliesslich in den Patienten.",
          damage: [
            {description: 'Infektion, '},
            {description: 'Ungewollte Immunreaktion'},
          ],
          probabilityOfOccurrenceBefore: 2,
          severity: 4,
          measures: [
            {description: 'Ordnungsgemässe Lagerung der Bauplattform gemäss SOP.'},
            {description: 'Vor Gebrauch die Bauplattform mit Isopropanol reinigen gemäss SOP.'},
          ],
          probabilityOfOccurrenceAfter: 1,
        },
        {
          id: 8,
          categoryId: 2,
          name: "Bauplattform ist nicht aus demselben Material wie das Baumaterial.",
          imageName: require('../../assets/svg/table_icons/not_same_material.svg'),
          riskPriority: "2 mittel",
          notApplicable: false,
          accepted: false,
          hazardDetailDescription: "Ordnungsgemässe Lagerung der Bauplattform gemäss SOP. Vor Gebrauch die Bauplattform mit G23.",
          damage: [
            {description: 'Ordnungsgemässe Lagerung der Bauplattform gemäss SOP.'},
            {description: 'Vor Gebrauch die Bauplattform mit G23.'},
          ],
          probabilityOfOccurrenceBefore: 2,
          severity: 4,
          measures: [
            {description: 'Vor Gebrauch die Bauplattform bezüglich Material überprüfen.'},
          ],
          probabilityOfOccurrenceAfter: 1,
        },
        {
          id: 9,
          categoryId: 2,
          name: "Die Beschichterlippe ist abgenutzt.",
          imageName: require('../../assets/svg/table_icons/coater_flap_worn.svg'),
          riskPriority: "2 mittel",
          notApplicable: false,
          accepted: false,
          hazardDetailDescription: "Implantat ist nicht formschlüssig - passt nicht mehr aufgrund verschlechtertem Schichtaufbau.",
          damage: [
            {description: 'Schädigung der Weichteile / Sehnervs.'},
          ],
          probabilityOfOccurrenceBefore: 3,
          severity: 4,
          measures: [
            {description: 'Geschultes Personal.'},
            {description: 'Visuelle Prüfung  des Pulverausstrichs bei der zuletzt gebauten  Schicht gemäss SOP.'},
            {description: 'Soll-Ist Vergleich mittels 3D-Scan bei der Type Examination gemäss SOP.'},
          ],
          probabilityOfOccurrenceAfter: 2,
        },
        {
          id: 10,
          categoryId: 2,
          name: "Der Beschichter kollidiert mit aus dem Pulverbett ragenden Bauteilstrukturen.",
          imageName: require('../../assets/svg/table_icons/coater_collides.svg'),
          riskPriority: "2 mittel",
          notApplicable: false,
          accepted: false,
          hazardDetailDescription: "Implantat ist nicht formschlüssig - passt nicht mehr aufgrund einer Verschiebung der Bauteilstruktur oder Ablösung von der  Supportstruktur.",
          damage: [
            {description: 'Schädigung der Weichteile / Sehnervs.'},
          ],
          probabilityOfOccurrenceBefore: 3,
          severity: 4,
          measures: [
            {description: 'Bei harten Kollisionen bricht die Anlage den Baujob selber ab.'},
            {description: 'Soll-Ist Vergleich mittels 3D-Scan bei der Type Examination.'},
          ],
          probabilityOfOccurrenceAfter: 2,
        },
        {
          id: 11,
          categoryId: 2,
          name: "Fehlerhafter Schichtaufbau.",
          imageName: require('../../assets/svg/table_icons/faulty_layer_structure.svg'),
          riskPriority: "2 mittel",
          notApplicable: false,
          accepted: false,
          hazardDetailDescription: "Implantat bricht durch Gefügefehler (Reduzierte mechanische Festigkeit) aufgrund  von Fehlern im Schichtaufbau verursacht durch ungleichmässig ausgestrichenes Pulver.",
          damage: [
            {description: 'Zweitoperation'},
          ],
          probabilityOfOccurrenceBefore: 3,
          severity: 3,
          measures: [
            {description: 'SLM Anlage verfügt über ein Layer Control System, das bei fehlerhaften Beschichtung den Vorgang vor dem Belichtung wiederholt.'},
            {description: 'Bei mehrfach fehlerhafter Beschichtung muss der Baujob erneut aufgesetzt und ausgeführt werden.'},
          ],
          probabilityOfOccurrenceAfter: 2,
        }
      ],
      hazardsSliced: null,
    }
  },
  watch: {
    hazardOriginalIdTableNumber: function () {
      if (this.hazardNameTable !== "") {
        switch (this.hazardRiskPriorityTableNumber) {
          case 1:
            this.hazardRiskPriorityWord = 'gering'
            break
          case 2:
            this.hazardRiskPriorityWord = 'mittel'
            break
          case 3:
            this.hazardRiskPriorityWord = 'hoch'
            break
        }

        let damageObjectList = []

        let i = 0
        while (i < this.hazardDamageTable.length) {
          if (this.hazardDamageTable[i] !== undefined && this.hazardDamageTable[i] !== null && this.hazardDamageTable[i] !== '' && damageObjectList.filter(e => e.description === this.hazardDamageTable[i]).length === 0) {
            damageObjectList.push({description: this.hazardDamageTable[i]})
          }
          i++;
        }

        let measureObjectList = []
        let j = 0

        while (j < this.hazardMeasuresTable.length) {
          if (this.hazardMeasuresTable[j] !== undefined && this.hazardMeasuresTable[j] !== null && this.hazardMeasuresTable[j] !== '' && measureObjectList.filter(e => e.description === this.hazardMeasuresTable[j]).length === 0) {
            measureObjectList.push({description: this.hazardMeasuresTable[j]})
          }
          j++;
        }

        this.hazardNewId = this.hazards.length + 1

        this.hazards.push({
          id: this.hazardNewId,
          categoryId: this.nameCounterTable + 1,
          name: this.hazardNameTable,
          imageName: this.hazardImageNameTable,
          riskPriority: this.hazardRiskPriorityTableNumber + ' ' + this.hazardRiskPriorityWord,
          hazardDetailDescription: this.hazardSituationTable,
          damage: damageObjectList,
          probabilityOfOccurrenceBefore: this.hazardProbabilityOfOccurenceBeforeTable,
          severity: this.hazardSeverityTable,
          measures: measureObjectList,
          probabilityOfOccurrenceAfter: this.hazardProbabilityOfOccurenceAfterTable,
        })
        switch (this.nameCounterTable) {
          case 0:
            this.hazardsSliced = this.hazards.filter(priority => priority.categoryId === 1)
            break
          case 1:
            this.hazardsSliced = this.hazards.filter(priority => priority.categoryId === 2)
            break
        }
        this.toastMessage = 'Gefährdung wurde erfolgreich hinzugefügt.'
      } else {
        this.toastMessage = 'Gefährdung wurde erfolgreich verifiziert.'
      }
      this.launch_notification()
      this.numberOfCheckedCheckboxes(this.hazardOriginalIdTableNumber, false, true, true)
    },
    nameCounterTable: function () {
      let oldCategoryId
      //for case: nameCounterTable = 0, category = 1 before
      if (this.nameCounterTable === 1) {
        oldCategoryId = 1
      }
      //for case: nameCounterTable = 1, category = 2 before
      else if (this.nameCounterTable === 0) {
        oldCategoryId = 2
      }

      this.idOfFirstElementActualCategory = this.hazards.find(priority => priority.categoryId === oldCategoryId).id
      this.idOfLastElementActualCategory = this.hazards.find(priority => priority.categoryId === oldCategoryId).id + this.hazards.filter(priority => priority.categoryId === oldCategoryId).length
      for (let i = this.idOfFirstElementActualCategory; i < this.idOfLastElementActualCategory; i++) {
        if (document.getElementById("confirm" + i) !== null) {
          document.getElementById("confirm" + i).checked = false
        }
      }

      switch (this.nameCounterTable) {
        case 0:
          this.hazardsSliced = this.hazards.filter(priority => priority.categoryId === 1)
          break
        case 1:
          this.hazardsSliced = this.hazards.filter(priority => priority.categoryId === 2)
          break
      }

      this.deleteNotSavedNewHazardInProgressArrays()
      this.numberOfCheckedCheckboxes(null, true, false, false)
    },
  },
  created() {
    if (localStorage.checkedCheckboxesArray === undefined || localStorage.checkedCheckboxesArray === '') {
      localStorage.checkedCheckboxesArray = JSON.stringify([])
    }
    if (localStorage.acceptArray === undefined || localStorage.acceptArray === '') {
      localStorage.acceptArray = JSON.stringify([])
    }

    if (this.nameCounterTable === 0) {
      this.hazardsSliced = this.hazards.filter(priority => priority.categoryId === 1)
    }
    let nameCounterLocalStorageVariable = parseInt(localStorage.nameCounter, 10)
    if (this.nameCounterTable === nameCounterLocalStorageVariable || localStorage.nameCounter === undefined) {
      this.deleteNotSavedNewHazardInProgressArrays()
    }
  },
  mounted() {
    if (this.$route.params.hazardOriginalIdListView !== undefined) {
      this.hazardOriginalIdTableNumber = this.$route.params.hazardOriginalIdListView
    }
    if (this.$route.params.hazardNameListView !== undefined) {
      this.hazardNameTable = this.$route.params.hazardNameListView
      this.hazardSituationTable = this.$route.params.hazardSituationListView
      this.hazardDamageTable = this.$route.params.hazardDamageListView
      this.hazardProbabilityOfOccurenceBeforeTable = this.$route.params.hazardProbabilityOfOccurenceBeforeListView
      this.hazardSeverityTable = this.$route.params.hazardSeverityListView
      this.hazardMeasuresTable = this.$route.params.hazardMeasuresListView
      this.hazardProbabilityOfOccurenceAfterTable = this.$route.params.hazardProbabilityOfOccurenceAfterListView
      this.hazardRiskPriorityTableNumber = this.$route.params.hazardRiskPriorityListView
      this.hazardOriginalIdTableNumber = parseInt(this.hazardOriginalIdTableNumber, 10)
      this.hazardImageNameTable = this.hazards.find(hazard => hazard.id === this.hazardOriginalIdTableNumber).imageName
    }
    this.numberOfCheckedCheckboxes(null, true, false, false)
  },
  methods: {
    deleteNotSavedNewHazardInProgressArrays() {
      if (localStorage.checkedCheckboxesArray !== undefined || localStorage.checkedCheckboxesArray !== '') {
        for (let i = 0; i < JSON.parse(localStorage.checkedCheckboxesArray).length; i++) {
          let partOf = false
          for (let j = 0; j < this.hazardsSliced.length; j++) {
            if (JSON.parse(localStorage.checkedCheckboxesArray)[i] === this.hazardsSliced[j].id) {
              partOf = true
            }
          }
          if (partOf === false) {
            const index = JSON.parse(localStorage.checkedCheckboxesArray).indexOf(JSON.parse(localStorage.checkedCheckboxesArray)[i])
            if (index !== -1) {
              let a = JSON.parse(localStorage.checkedCheckboxesArray)
              a.splice(index, 1)  // 2nd parameter means remove one item only
              localStorage.checkedCheckboxesArray = JSON.stringify(a)
            }
          }
        }
      }

      if (localStorage.acceptArray !== undefined || localStorage.acceptArray !== '') {
        for (let i = 0; i < JSON.parse(localStorage.acceptArray).length; i++) {
          let partOf = false
          for (let j = 0; j < this.hazardsSliced.length; j++) {
            if (JSON.parse(localStorage.acceptArray)[i] === this.hazardsSliced[j].id) {
              partOf = true
            }
          }
          if (partOf === false) {
            const index = JSON.parse(localStorage.acceptArray).indexOf(JSON.parse(localStorage.acceptArray)[i])
            if (index !== -1) {
              let a = JSON.parse(localStorage.acceptArray)
              a.splice(index, 1)  // 2nd parameter means remove one item only
              localStorage.acceptArray = JSON.stringify(a)
            }
          }
        }
      }
    },
    launch_notification() {
      let notification = document.getElementById("toast")
      notification.className = "toast__show"
      setTimeout(() => {
        notification.className = notification.className.replace("toast__show", "")
      }, 4000)
    },
    moveCheckmark(elementId, element, action, time) {
      let actualAcceptedCheckmarkDiv = document.getElementById(element + elementId)
      actualAcceptedCheckmarkDiv.classList.add(action)
      setTimeout(() =>
          actualAcceptedCheckmarkDiv.classList.remove(action), time
      )
    },
    checkCustomMadeDeviceFields() {
      return this.customMadeDeviceDescription === '';
    },
    numberOfCheckedCheckboxes(itemId, acceptStatus, specification, newItem) {
      if (localStorage.checkedCheckboxesArray === undefined || localStorage.checkedCheckboxesArray === '') {
        localStorage.checkedCheckboxesArray = JSON.stringify([])
      }
      if (localStorage.acceptArray === undefined || localStorage.acceptArray === '') {
        localStorage.acceptArray = JSON.stringify([])
      }
      this.checkedCheckboxesArray = JSON.parse(localStorage.checkedCheckboxesArray)
      this.acceptArray = JSON.parse(localStorage.acceptArray)

      // If checkbox "nicht" zutreffend" is selected
      if (!acceptStatus && !specification && itemId !== null) {
        let actualCheckbox = document.getElementById("confirm" + itemId)
        if (actualCheckbox.checked === true) {
          this.checkedCheckboxesArray.push(itemId)
        } else {
          const index = this.checkedCheckboxesArray.indexOf(itemId)
          this.checkedCheckboxesArray.splice(index, 1)
        }
      }

      //If accept-Icon is set and should be unset after checkbox is checked
      if (itemId !== null) {
        if (this.acceptArray.includes(itemId) && acceptStatus === false) {
          this.acceptCounter--
          //Accept-Array
          const index = this.acceptArray.indexOf(itemId)
          this.acceptArray.splice(index, 1)
        }
        this.$forceUpdate()
      }

      // For Specification
      if (specification) {
        let checkbox = document.getElementById("confirm" + itemId)
        if (!localStorage.checkedCheckboxesArray.includes(itemId)) {
          if (checkbox != null) {
            checkbox.checked = true
          }
          this.checkedCheckboxesArray.push(itemId)
        }
        this.expanded = []
        if (!newItem) {
          this.toastMessage = 'Gefährdung wurde erfolgreich verifiziert.'
          this.launch_notification()
        }
      }

      // Update Sort
      for (let a = 0; a < this.hazards.length; a++) {
        let numberInArray = a + 1

        //Create notApplicable-Sort
        this.hazards[a].notApplicable = this.checkedCheckboxesArray.includes(numberInArray);

        //Create accepted-Sort
        this.hazards[a].accepted = this.acceptArray.includes(numberInArray);
      }

      //General Settings
      localStorage.checkedCheckboxesArray = JSON.stringify(this.checkedCheckboxesArray)
      localStorage.acceptArray = JSON.stringify(this.acceptArray)
      this.specification_customMadeDevice = null
      this.postProcessingPossibility = null
      this.customMadeDeviceDescription = ''

      this.numberOfCurrentCheckboxes = this.hazards.filter(priority => priority.categoryId === (this.nameCounterTable + 1)).length
      var numberFinished = JSON.parse(localStorage.checkedCheckboxesArray).length + JSON.parse(localStorage.acceptArray).length
      this.$emit('ReadCheckboxNumber', numberFinished, this.numberOfCurrentCheckboxes)

      let acceptArrayLength = JSON.parse(localStorage.acceptArray).length
      this.$emit('CustomMadeProcessSettings', acceptArrayLength)
    },
    accept(itemId) {
      this.customMadeDeviceDescription = ''

      if (!this.acceptArray.includes(itemId)) {
        this.acceptArray.push(itemId)
        this.acceptCounter++
        document.getElementById("confirm" + itemId).checked = false

        if (this.checkedCheckboxesArray.includes(itemId)) {
          const index = this.checkedCheckboxesArray.indexOf(itemId)
          this.checkedCheckboxesArray.splice(index, 1)
        }

        localStorage.checkedCheckboxesArray = JSON.stringify(this.checkedCheckboxesArray)
        localStorage.acceptArray = JSON.stringify(this.acceptArray)
      }

      this.toastMessage = 'Gefährdung wurde erfolgreich verifiziert.'
      this.launch_notification()

      this.expanded = []
      this.numberOfCheckedCheckboxes(itemId, true, false, false)
      this.moveCheckmark(itemId, 'accepted', 'apply-resize', 1000)
    },
    itemIdPartOfCheckedCheckboxesArray(itemId) {
      if (localStorage.checkedCheckboxesArray !== '') {
        let newCheckedCheckboxesArray = JSON.parse(localStorage.checkedCheckboxesArray)
        if (newCheckedCheckboxesArray.includes(itemId)) {
          return true
        }
      }
      return false
    },
    itemIdPartOfAcceptArray(itemId) {
      if (localStorage.acceptArray !== '') {
        let newAcceptArray = JSON.parse(localStorage.acceptArray)
        if (newAcceptArray.includes(itemId)) {
          return 1.0
        }
      }
      return 0.2
    },
    cancel() {
      localStorage.checkedCheckboxesArray = ''
      localStorage.acceptArray = ''

      this.specification_customMadeDevice = null
      this.postProcessingPossibility = null
      this.customMadeDeviceDescription = ''

      let nameCounterTableValue = 0
      localStorage.nameCounter = nameCounterTableValue
      this.$emit("updateNumber", nameCounterTableValue)
      this.numberOfCheckedCheckboxes(null, false, false, false)
      this.expanded = []
      this.showModal = false

      this.toastMessage = 'Aktueller Fortschrittstand wurde zurückgesetzt.'
      this.launch_notification()
    },
  }
}
</script>