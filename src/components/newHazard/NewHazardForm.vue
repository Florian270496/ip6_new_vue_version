<template>
  <!--Neue Gefährdung erstellen-->
  <div class="new-hazard">
    <div class="new-hazard__title">
      Neue Gefährdung erstellen
    </div>
    <form class="new-hazard__form">
      <div class="new-hazard__row">
        <div class="new-hazard__column new-hazard__column--column1">
          <label>Gefährdung</label>
        </div>
        <div class="new-hazard__column new-hazard__column--column2">
          <input v-model="hazardNameNewHazardForm" class="new-hazard__input" type="text">
        </div>
      </div>
      <div class="new-hazard__row">
        <div class="new-hazard__column new-hazard__column--column1">
          <label>Gefährdungssituation</label>
        </div>
        <div class="new-hazard__column new-hazard__column--column2">
          <input v-model="hazardSituationNewHazardForm" class="new-hazard__input" type="text">
        </div>
      </div>
      <div class="new-hazard__row flex_add">
        <div class="new-hazard__column new-hazard__column--column1">
          <label>Schaden</label>
        </div>
        <div class="new-hazard__column new-hazard__column--column2">
          <input v-model="hazardDamageNewHazardForm[0]" class="new-hazard__input" type="text">
          <svg class="new-hazard__add-icon" @click="addNewTextfield('damage', 'plus')"
               width="20" height="20"
               viewBox="0 0 20 20" fill="none"
               xmlns="http://www.w3.org/2000/svg">
            <path
                d="M10 0C4.48566 0 0 4.48566 0 10C0 15.5143 4.48566 20 10 20C15.5143 20 20 15.5136 20 10C20 4.48645 15.5143 0 10 0ZM10 18.4508C5.34082 18.4508 1.54918 14.66 1.54918 10C1.54918 5.34004 5.34082 1.54918 10 1.54918C14.6592 1.54918 18.4508 5.34004 18.4508 10C18.4508 14.66 14.66 18.4508 10 18.4508Z"
                fill="#32404F"/>
            <path
                d="M13.873 9.15568H10.7746V6.05732C10.7746 5.62975 10.4284 5.28271 10 5.28271C9.57164 5.28271 9.22539 5.62975 9.22539 6.05732V9.15568H6.12703C5.69867 9.15568 5.35242 9.50271 5.35242 9.93029C5.35242 10.3579 5.69867 10.7049 6.12703 10.7049H9.22539V13.8033C9.22539 14.2308 9.57164 14.5779 10 14.5779C10.4284 14.5779 10.7746 14.2308 10.7746 13.8033V10.7049H13.873C14.3013 10.7049 14.6476 10.3579 14.6476 9.93029C14.6476 9.50271 14.3013 9.15568 13.873 9.15568Z"
                fill="#32404F"/>
          </svg>
          <div class="new-hazard__minus-icon-container">
            <svg v-if="damagaTextfieldNumber > 1" class="new-hazard__add-icon"
                 @click="addNewTextfield('damage', 'minus')"
                 width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path
                  d="M10 0C4.48566 0 0 4.48566 0 10C0 15.5143 4.48566 20 10 20C15.5143 20 20 15.5136 20 10C20 4.48645 15.5143 0 10 0ZM10 18.4508C5.34082 18.4508 1.54918 14.66 1.54918 10C1.54918 5.34004 5.34082 1.54918 10 1.54918C14.6592 1.54918 18.4508 5.34004 18.4508 10C18.4508 14.66 14.66 18.4508 10 18.4508Z"
                  fill="#32404F"/>
              <path
                  d="M13.873 9.15571H10.7746C10.7746 9.15571 10.4284 9.1557 10 9.1557C9.57164 9.1557 9.22539 9.15572 9.22539 9.15572L6.12703 9.15571C5.69867 9.15571 5.35242 9.50274 5.35242 9.93032C5.35242 10.3579 5.69867 10.7049 6.12703 10.7049H9.22539C9.22539 10.7049 9.57164 10.7049 10 10.7049C10.4284 10.7049 10.7746 10.7049 10.7746 10.7049H13.873C14.3013 10.7049 14.6476 10.3579 14.6476 9.93032C14.6476 9.50274 14.3013 9.15571 13.873 9.15571Z"
                  fill="#32404F"/>
            </svg>
          </div>
        </div>
      </div>
      <div v-for="damageNumber in damagaTextfieldNumber-1" :key="'additionalDamageTextField'+damageNumber"
           class="new-hazard__row new-hazard__row--add">
        <div class="new-hazard__column new-hazard__column--empty-column-add">
        </div>
        <div class="new-hazard__column new-hazard__column--add">
          <input v-model="hazardDamageNewHazardForm[damageNumber]" class="new-hazard__input" type="text">
        </div>
      </div>

      <div class="new-hazard__row">
        <div class="new-hazard__column new-hazard__column--column1 new-hazard__column--ProbabilityOfOccurrence">
          <label>
            <div class="new-hazard__label-row1">Eintretungswahrscheinlichkeit</div>
            <div class="new-hazard__label-row2">vorher</div>
          </label>
          <div class="tooltip tooltip--expand tooltip--new-hazard new-hazard__info-icon-container"
               data-title="Eintretungs-wahrscheinlichkeit vor Anwendung der Massnahmen.">
            <svg class="new-hazard__info-icon" width="6" height="12"
                 viewBox="0 0 6 12" fill="none"
                 xmlns="http://www.w3.org/2000/svg">
              <path
                  d="M5.14332 10.705L4.97565 11.3904C4.47264 11.5889 4.07084 11.7401 3.77164 11.8439C3.47211 11.9482 3.12408 12 2.72755 12C2.11861 12 1.64496 11.8508 1.30715 11.5545C0.96934 11.2571 0.80038 10.8801 0.80038 10.4228C0.80038 10.2458 0.812641 10.0637 0.83813 9.87816C0.863834 9.69243 0.904703 9.48324 0.960628 9.24943L1.58925 7.02446C1.64518 6.8114 1.69271 6.60953 1.73079 6.41863C1.7694 6.22892 1.788 6.05437 1.788 5.89724C1.788 5.61309 1.72917 5.41434 1.61205 5.3026C1.49493 5.19118 1.27144 5.13461 0.939656 5.13461C0.777149 5.13461 0.610126 5.16063 0.439876 5.21097C0.268873 5.26151 0.122713 5.31034 0 5.35573L0.168099 4.66978C0.579904 4.50211 0.973534 4.35853 1.35006 4.23937C1.72659 4.11988 2.08236 4.06008 2.41889 4.06008C3.02363 4.06008 3.49029 4.20624 3.81799 4.49856C4.14569 4.79109 4.30949 5.17031 4.30949 5.63761C4.30949 5.7343 4.29874 5.90466 4.27561 6.14815C4.25303 6.39218 4.21098 6.61577 4.14967 6.81915L3.52374 9.0352C3.47244 9.21319 3.4263 9.41667 3.38618 9.64564C3.34478 9.87311 3.32499 10.0469 3.32499 10.1635C3.32499 10.4577 3.39059 10.6586 3.52212 10.7654C3.65462 10.8722 3.88284 10.9254 4.207 10.9254C4.35918 10.9254 4.53233 10.8984 4.72474 10.8454C4.9166 10.7923 5.05653 10.7458 5.14332 10.705ZM5.30206 1.40136C5.30206 1.78747 5.15655 2.11721 4.86412 2.38834C4.57245 2.66044 4.22098 2.7966 3.80982 2.7966C3.39737 2.7966 3.04504 2.66044 2.75003 2.38834C2.45556 2.1171 2.308 1.78747 2.308 1.40136C2.308 1.01602 2.45556 0.685733 2.75003 0.41116C3.0445 0.137017 3.39747 0 3.80982 0C4.22087 0 4.57245 0.13734 4.86412 0.41116C5.15676 0.685733 5.30206 1.01612 5.30206 1.40136Z"
                  fill="#32404F"/>
            </svg>
          </div>
        </div>

        <div class="new-hazard__column new-hazard__column--column2">
          <div class="new-hazard__radio-buttons">
            <label class="radio-button-container"> 1
              <input v-model="hazardProbabilityOfOccurenceBeforeNewHazardForm" type="radio"
                     name="probabilityOfOccurrence" value="1"
                     @click="displayRadioValueOfProbabilityOfOccurrence(1)">
              <span class="radio-button-container__button"></span>
            </label>
            <label class="radio-button-container"> 2
              <input v-model="hazardProbabilityOfOccurenceBeforeNewHazardForm" type="radio"
                     name="probabilityOfOccurrence" value="2"
                     @click="displayRadioValueOfProbabilityOfOccurrence(1)">
              <span class="radio-button-container__button"></span>
            </label>
            <label class="radio-button-container"> 3
              <input v-model="hazardProbabilityOfOccurenceBeforeNewHazardForm" type="radio"
                     name="probabilityOfOccurrence" value="3"
                     @click="displayRadioValueOfProbabilityOfOccurrence(1)">
              <span class="radio-button-container__button"></span>
            </label>
            <label class="radio-button-container"> 4
              <input v-model="hazardProbabilityOfOccurenceBeforeNewHazardForm" type="radio"
                     name="probabilityOfOccurrence" value="4"
                     @click="displayRadioValueOfProbabilityOfOccurrence(1)">
              <span class="radio-button-container__button"></span>
            </label>
            <label class="radio-button-container"> 5
              <input v-model="hazardProbabilityOfOccurenceBeforeNewHazardForm" type="radio"
                     name="probabilityOfOccurrence" value="5"
                     @click="displayRadioValueOfProbabilityOfOccurrence(1)">
              <span class="radio-button-container__button"></span>
            </label>
          </div>
        </div>
        <div class="new-hazard__column new-hazard__column--column3">
          <div class="new-hazard__column--column3-part1">
            <label>Schweregrad</label>
            <div class="tooltip tooltip--expand tooltip--new-hazard new-hazard__info-icon-container"
                 data-title="Schweregrad vor Anwendung der Massnahmen.">
              <svg class="new-hazard__info-icon" width="6" height="12" viewBox="0 0 6 12" fill="none"
                   xmlns="http://www.w3.org/2000/svg">
                <path
                    d="M5.14332 10.705L4.97565 11.3904C4.47264 11.5889 4.07084 11.7401 3.77164 11.8439C3.47211 11.9482 3.12408 12 2.72755 12C2.11861 12 1.64496 11.8508 1.30715 11.5545C0.96934 11.2571 0.80038 10.8801 0.80038 10.4228C0.80038 10.2458 0.812641 10.0637 0.83813 9.87816C0.863834 9.69243 0.904703 9.48324 0.960628 9.24943L1.58925 7.02446C1.64518 6.8114 1.69271 6.60953 1.73079 6.41863C1.7694 6.22892 1.788 6.05437 1.788 5.89724C1.788 5.61309 1.72917 5.41434 1.61205 5.3026C1.49493 5.19118 1.27144 5.13461 0.939656 5.13461C0.777149 5.13461 0.610126 5.16063 0.439876 5.21097C0.268873 5.26151 0.122713 5.31034 0 5.35573L0.168099 4.66978C0.579904 4.50211 0.973534 4.35853 1.35006 4.23937C1.72659 4.11988 2.08236 4.06008 2.41889 4.06008C3.02363 4.06008 3.49029 4.20624 3.81799 4.49856C4.14569 4.79109 4.30949 5.17031 4.30949 5.63761C4.30949 5.7343 4.29874 5.90466 4.27561 6.14815C4.25303 6.39218 4.21098 6.61577 4.14967 6.81915L3.52374 9.0352C3.47244 9.21319 3.4263 9.41667 3.38618 9.64564C3.34478 9.87311 3.32499 10.0469 3.32499 10.1635C3.32499 10.4577 3.39059 10.6586 3.52212 10.7654C3.65462 10.8722 3.88284 10.9254 4.207 10.9254C4.35918 10.9254 4.53233 10.8984 4.72474 10.8454C4.9166 10.7923 5.05653 10.7458 5.14332 10.705ZM5.30206 1.40136C5.30206 1.78747 5.15655 2.11721 4.86412 2.38834C4.57245 2.66044 4.22098 2.7966 3.80982 2.7966C3.39737 2.7966 3.04504 2.66044 2.75003 2.38834C2.45556 2.1171 2.308 1.78747 2.308 1.40136C2.308 1.01602 2.45556 0.685733 2.75003 0.41116C3.0445 0.137017 3.39747 0 3.80982 0C4.22087 0 4.57245 0.13734 4.86412 0.41116C5.15676 0.685733 5.30206 1.01612 5.30206 1.40136Z"
                    fill="#32404F"/>
              </svg>
            </div>
          </div>
          <div class="new-hazard__column--column3-part2">
            <div class="new-hazard__radio-buttons">
              <label class="radio-button-container"> 1
                <input v-model="hazardSeverityNewHazardForm" type="radio" name="severity" value="1"
                       @click="displayRadioValueOfSeverity()">
                <span class="radio-button-container__button"></span>
              </label>
              <label class="radio-button-container"> 2
                <input v-model="hazardSeverityNewHazardForm" type="radio" name="severity" value="2"
                       @click="displayRadioValueOfSeverity()">
                <span class="radio-button-container__button"></span>
              </label>
              <label class="radio-button-container"> 3
                <input v-model="hazardSeverityNewHazardForm" type="radio" name="severity" value="3"
                       @click="displayRadioValueOfSeverity()">
                <span class="radio-button-container__button"></span>
              </label>
              <label class="radio-button-container"> 4
                <input v-model="hazardSeverityNewHazardForm" type="radio" name="severity" value="4"
                       @click="displayRadioValueOfSeverity()">
                <span class="radio-button-container__button"></span>
              </label>
              <label class="radio-button-container"> 5
                <input v-model="hazardSeverityNewHazardForm" type="radio" name="severity" value="5"
                       @click="displayRadioValueOfSeverity()">
                <span class="radio-button-container__button"></span>
              </label>
            </div>
          </div>
        </div>
      </div>

      <div class="new-hazard__row">
        <div class="new-hazard__column new-hazard__column--column1">
          <label class="risk_priority_number_title">Risikoprioritätszahl</label>
          <div class="tooltip tooltip--expand tooltip--new-hazard new-hazard__info-icon-container"
               data-title="Risikoprioritätszahl vor Anwendung der Massnahmen.">
            <svg class="new-hazard__info-icon" width="6" height="12" viewBox="0 0 6 12" fill="none"
                 xmlns="http://www.w3.org/2000/svg">
              <path
                  d="M5.14332 10.705L4.97565 11.3904C4.47264 11.5889 4.07084 11.7401 3.77164 11.8439C3.47211 11.9482 3.12408 12 2.72755 12C2.11861 12 1.64496 11.8508 1.30715 11.5545C0.96934 11.2571 0.80038 10.8801 0.80038 10.4228C0.80038 10.2458 0.812641 10.0637 0.83813 9.87816C0.863834 9.69243 0.904703 9.48324 0.960628 9.24943L1.58925 7.02446C1.64518 6.8114 1.69271 6.60953 1.73079 6.41863C1.7694 6.22892 1.788 6.05437 1.788 5.89724C1.788 5.61309 1.72917 5.41434 1.61205 5.3026C1.49493 5.19118 1.27144 5.13461 0.939656 5.13461C0.777149 5.13461 0.610126 5.16063 0.439876 5.21097C0.268873 5.26151 0.122713 5.31034 0 5.35573L0.168099 4.66978C0.579904 4.50211 0.973534 4.35853 1.35006 4.23937C1.72659 4.11988 2.08236 4.06008 2.41889 4.06008C3.02363 4.06008 3.49029 4.20624 3.81799 4.49856C4.14569 4.79109 4.30949 5.17031 4.30949 5.63761C4.30949 5.7343 4.29874 5.90466 4.27561 6.14815C4.25303 6.39218 4.21098 6.61577 4.14967 6.81915L3.52374 9.0352C3.47244 9.21319 3.4263 9.41667 3.38618 9.64564C3.34478 9.87311 3.32499 10.0469 3.32499 10.1635C3.32499 10.4577 3.39059 10.6586 3.52212 10.7654C3.65462 10.8722 3.88284 10.9254 4.207 10.9254C4.35918 10.9254 4.53233 10.8984 4.72474 10.8454C4.9166 10.7923 5.05653 10.7458 5.14332 10.705ZM5.30206 1.40136C5.30206 1.78747 5.15655 2.11721 4.86412 2.38834C4.57245 2.66044 4.22098 2.7966 3.80982 2.7966C3.39737 2.7966 3.04504 2.66044 2.75003 2.38834C2.45556 2.1171 2.308 1.78747 2.308 1.40136C2.308 1.01602 2.45556 0.685733 2.75003 0.41116C3.0445 0.137017 3.39747 0 3.80982 0C4.22087 0 4.57245 0.13734 4.86412 0.41116C5.15676 0.685733 5.30206 1.01612 5.30206 1.40136Z"
                  fill="#32404F"/>
            </svg>
          </div>

        </div>
        <div class="new-hazard__column new-hazard__column--column2">
          <div class="new-hazard__result" id="resultRiskPriorityNumber">
            <div id="resultProbabilityOfOccurrence"></div>
            <p>/</p>
            <div id="resultSeverity"></div>
          </div>
        </div>
      </div>

      <div class="new-hazard__row flex_add">
        <div class="new-hazard__column new-hazard__column--column1">
          <label>Massnahmen</label>
        </div>
        <div class="new-hazard__column new-hazard__column--column2 add_column">
          <input v-model="hazardMeasuresNewHazardForm[0]" class="new-hazard__input" type="text">
          <svg class="new-hazard__add-icon" width="20" height="20" @click="addNewTextfield('measure', 'plus')"
               viewBox="0 0 20 20"
               fill="none"
               xmlns="http://www.w3.org/2000/svg">
            <path
                d="M10 0C4.48566 0 0 4.48566 0 10C0 15.5143 4.48566 20 10 20C15.5143 20 20 15.5136 20 10C20 4.48645 15.5143 0 10 0ZM10 18.4508C5.34082 18.4508 1.54918 14.66 1.54918 10C1.54918 5.34004 5.34082 1.54918 10 1.54918C14.6592 1.54918 18.4508 5.34004 18.4508 10C18.4508 14.66 14.66 18.4508 10 18.4508Z"
                fill="#32404F"/>
            <path
                d="M13.873 9.15568H10.7746V6.05732C10.7746 5.62975 10.4284 5.28271 10 5.28271C9.57164 5.28271 9.22539 5.62975 9.22539 6.05732V9.15568H6.12703C5.69867 9.15568 5.35242 9.50271 5.35242 9.93029C5.35242 10.3579 5.69867 10.7049 6.12703 10.7049H9.22539V13.8033C9.22539 14.2308 9.57164 14.5779 10 14.5779C10.4284 14.5779 10.7746 14.2308 10.7746 13.8033V10.7049H13.873C14.3013 10.7049 14.6476 10.3579 14.6476 9.93029C14.6476 9.50271 14.3013 9.15568 13.873 9.15568Z"
                fill="#32404F"/>
          </svg>
          <div class="new-hazard__minus-icon-container">
            <svg v-if="measureTextfieldNumber > 1" class="new-hazard__add-icon"
                 @click="addNewTextfield('measure', 'minus')"
                 width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path
                  d="M10 0C4.48566 0 0 4.48566 0 10C0 15.5143 4.48566 20 10 20C15.5143 20 20 15.5136 20 10C20 4.48645 15.5143 0 10 0ZM10 18.4508C5.34082 18.4508 1.54918 14.66 1.54918 10C1.54918 5.34004 5.34082 1.54918 10 1.54918C14.6592 1.54918 18.4508 5.34004 18.4508 10C18.4508 14.66 14.66 18.4508 10 18.4508Z"
                  fill="#32404F"/>
              <path
                  d="M13.873 9.15571H10.7746C10.7746 9.15571 10.4284 9.1557 10 9.1557C9.57164 9.1557 9.22539 9.15572 9.22539 9.15572L6.12703 9.15571C5.69867 9.15571 5.35242 9.50274 5.35242 9.93032C5.35242 10.3579 5.69867 10.7049 6.12703 10.7049H9.22539C9.22539 10.7049 9.57164 10.7049 10 10.7049C10.4284 10.7049 10.7746 10.7049 10.7746 10.7049H13.873C14.3013 10.7049 14.6476 10.3579 14.6476 9.93032C14.6476 9.50274 14.3013 9.15571 13.873 9.15571Z"
                  fill="#32404F"/>
            </svg>
          </div>
        </div>
      </div>

      <div v-for="measureNumber in measureTextfieldNumber-1" :key="'additionalMeasureTextField'+measureNumber"
           class="new-hazard__row new-hazard__row--add">
        <div class="new-hazard__column new-hazard__column--empty-column-add">
        </div>
        <div class="new-hazard__column new-hazard__column--add">
          <input v-model="hazardMeasuresNewHazardForm[measureNumber]" class="new-hazard__input" type="text">
        </div>
      </div>

      <div class="new-hazard__row">
        <div class="new-hazard__column new-hazard__column--column1">
          <label>Implementierungsnachweis</label>
          <div class="tooltip tooltip--expand tooltip--new-hazard new-hazard__info-icon-container"
               data-title="Optionaler Upload eines Nachweises.">
            <svg class="new-hazard__info-icon" width="6" height="12" viewBox="0 0 6 12" fill="none"
                 xmlns="http://www.w3.org/2000/svg">
              <path
                  d="M5.14332 10.705L4.97565 11.3904C4.47264 11.5889 4.07084 11.7401 3.77164 11.8439C3.47211 11.9482 3.12408 12 2.72755 12C2.11861 12 1.64496 11.8508 1.30715 11.5545C0.96934 11.2571 0.80038 10.8801 0.80038 10.4228C0.80038 10.2458 0.812641 10.0637 0.83813 9.87816C0.863834 9.69243 0.904703 9.48324 0.960628 9.24943L1.58925 7.02446C1.64518 6.8114 1.69271 6.60953 1.73079 6.41863C1.7694 6.22892 1.788 6.05437 1.788 5.89724C1.788 5.61309 1.72917 5.41434 1.61205 5.3026C1.49493 5.19118 1.27144 5.13461 0.939656 5.13461C0.777149 5.13461 0.610126 5.16063 0.439876 5.21097C0.268873 5.26151 0.122713 5.31034 0 5.35573L0.168099 4.66978C0.579904 4.50211 0.973534 4.35853 1.35006 4.23937C1.72659 4.11988 2.08236 4.06008 2.41889 4.06008C3.02363 4.06008 3.49029 4.20624 3.81799 4.49856C4.14569 4.79109 4.30949 5.17031 4.30949 5.63761C4.30949 5.7343 4.29874 5.90466 4.27561 6.14815C4.25303 6.39218 4.21098 6.61577 4.14967 6.81915L3.52374 9.0352C3.47244 9.21319 3.4263 9.41667 3.38618 9.64564C3.34478 9.87311 3.32499 10.0469 3.32499 10.1635C3.32499 10.4577 3.39059 10.6586 3.52212 10.7654C3.65462 10.8722 3.88284 10.9254 4.207 10.9254C4.35918 10.9254 4.53233 10.8984 4.72474 10.8454C4.9166 10.7923 5.05653 10.7458 5.14332 10.705ZM5.30206 1.40136C5.30206 1.78747 5.15655 2.11721 4.86412 2.38834C4.57245 2.66044 4.22098 2.7966 3.80982 2.7966C3.39737 2.7966 3.04504 2.66044 2.75003 2.38834C2.45556 2.1171 2.308 1.78747 2.308 1.40136C2.308 1.01602 2.45556 0.685733 2.75003 0.41116C3.0445 0.137017 3.39747 0 3.80982 0C4.22087 0 4.57245 0.13734 4.86412 0.41116C5.15676 0.685733 5.30206 1.01612 5.30206 1.40136Z"
                  fill="#32404F"/>
            </svg>
          </div>
        </div>
        <div class="new-hazard__column new-hazard__column--column2">
          <input type="file" name="file" id="file" class="inputfile" title="test"/>
        </div>
      </div>

      <div class="new-hazard__row">
        <div class="new-hazard__column new-hazard__column--column1 new-hazard__column--ProbabilityOfOccurrence">
          <label>
            <div class="new-hazard__label-row1">Eintretungswahrscheinlichkeit</div>
            <div class="new-hazard__label-row2">nachher</div>
          </label>
          <div class="tooltip tooltip--expand tooltip--new-hazard new-hazard__info-icon-container"
               data-title="Eintretungs-wahrscheinlichkeit nach Anwendung der Massnahmen.">
            <svg class="new-hazard__info-icon" width="6" height="12" viewBox="0 0 6 12" fill="none"
                 xmlns="http://www.w3.org/2000/svg">
              <path
                  d="M5.14332 10.705L4.97565 11.3904C4.47264 11.5889 4.07084 11.7401 3.77164 11.8439C3.47211 11.9482 3.12408 12 2.72755 12C2.11861 12 1.64496 11.8508 1.30715 11.5545C0.96934 11.2571 0.80038 10.8801 0.80038 10.4228C0.80038 10.2458 0.812641 10.0637 0.83813 9.87816C0.863834 9.69243 0.904703 9.48324 0.960628 9.24943L1.58925 7.02446C1.64518 6.8114 1.69271 6.60953 1.73079 6.41863C1.7694 6.22892 1.788 6.05437 1.788 5.89724C1.788 5.61309 1.72917 5.41434 1.61205 5.3026C1.49493 5.19118 1.27144 5.13461 0.939656 5.13461C0.777149 5.13461 0.610126 5.16063 0.439876 5.21097C0.268873 5.26151 0.122713 5.31034 0 5.35573L0.168099 4.66978C0.579904 4.50211 0.973534 4.35853 1.35006 4.23937C1.72659 4.11988 2.08236 4.06008 2.41889 4.06008C3.02363 4.06008 3.49029 4.20624 3.81799 4.49856C4.14569 4.79109 4.30949 5.17031 4.30949 5.63761C4.30949 5.7343 4.29874 5.90466 4.27561 6.14815C4.25303 6.39218 4.21098 6.61577 4.14967 6.81915L3.52374 9.0352C3.47244 9.21319 3.4263 9.41667 3.38618 9.64564C3.34478 9.87311 3.32499 10.0469 3.32499 10.1635C3.32499 10.4577 3.39059 10.6586 3.52212 10.7654C3.65462 10.8722 3.88284 10.9254 4.207 10.9254C4.35918 10.9254 4.53233 10.8984 4.72474 10.8454C4.9166 10.7923 5.05653 10.7458 5.14332 10.705ZM5.30206 1.40136C5.30206 1.78747 5.15655 2.11721 4.86412 2.38834C4.57245 2.66044 4.22098 2.7966 3.80982 2.7966C3.39737 2.7966 3.04504 2.66044 2.75003 2.38834C2.45556 2.1171 2.308 1.78747 2.308 1.40136C2.308 1.01602 2.45556 0.685733 2.75003 0.41116C3.0445 0.137017 3.39747 0 3.80982 0C4.22087 0 4.57245 0.13734 4.86412 0.41116C5.15676 0.685733 5.30206 1.01612 5.30206 1.40136Z"
                  fill="#32404F"/>
            </svg>
          </div>
        </div>
        <div class="new-hazard__column new-hazard__column--column2 new-hazard__column--column2-radio-buttons">
          <div class="new-hazard__radio-buttons">
            <label class="radio-button-container"> 1
              <input v-model="hazardProbabilityOfOccurenceAfterNewHazardForm" type="radio"
                     name="probabilityOfOccurrenceTwo" value="1"
                     @click="displayRadioValueOfProbabilityOfOccurrence(2)">
              <span class="radio-button-container__button"></span>
            </label>
            <label class="radio-button-container"> 2
              <input v-model="hazardProbabilityOfOccurenceAfterNewHazardForm" type="radio"
                     name="probabilityOfOccurrenceTwo" value="2"
                     @click="displayRadioValueOfProbabilityOfOccurrence(2)">
              <span class="radio-button-container__button"></span>
            </label>
            <label class="radio-button-container"> 3
              <input v-model="hazardProbabilityOfOccurenceAfterNewHazardForm" type="radio"
                     name="probabilityOfOccurrenceTwo" value="3"
                     @click="displayRadioValueOfProbabilityOfOccurrence(2)">
              <span class="radio-button-container__button"></span>
            </label>
            <label class="radio-button-container"> 4
              <input v-model="hazardProbabilityOfOccurenceAfterNewHazardForm" type="radio"
                     name="probabilityOfOccurrenceTwo" value="4"
                     @click="displayRadioValueOfProbabilityOfOccurrence(2)">
              <span class="radio-button-container__button"></span>
            </label>
            <label class="radio-button-container"> 5
              <input v-model="hazardProbabilityOfOccurenceAfterNewHazardForm" type="radio"
                     name="probabilityOfOccurrenceTwo" value="5"
                     @click="displayRadioValueOfProbabilityOfOccurrence(2)">
              <span class="radio-button-container__button"></span>
            </label>
          </div>
        </div>
        <div class="new-hazard__column new-hazard__column--column3">
          <div class="new-hazard__column--column3-part1">
            <label>Schweregrad</label>
            <div class="tooltip tooltip--expand tooltip--new-hazard new-hazard__info-icon-container"
                 data-title="Schweregrad nach Anwendung der Massnahmen.">
              <svg class="new-hazard__info-icon" width="6" height="12" viewBox="0 0 6 12" fill="none"
                   xmlns="http://www.w3.org/2000/svg">
                <path
                    d="M5.14332 10.705L4.97565 11.3904C4.47264 11.5889 4.07084 11.7401 3.77164 11.8439C3.47211 11.9482 3.12408 12 2.72755 12C2.11861 12 1.64496 11.8508 1.30715 11.5545C0.96934 11.2571 0.80038 10.8801 0.80038 10.4228C0.80038 10.2458 0.812641 10.0637 0.83813 9.87816C0.863834 9.69243 0.904703 9.48324 0.960628 9.24943L1.58925 7.02446C1.64518 6.8114 1.69271 6.60953 1.73079 6.41863C1.7694 6.22892 1.788 6.05437 1.788 5.89724C1.788 5.61309 1.72917 5.41434 1.61205 5.3026C1.49493 5.19118 1.27144 5.13461 0.939656 5.13461C0.777149 5.13461 0.610126 5.16063 0.439876 5.21097C0.268873 5.26151 0.122713 5.31034 0 5.35573L0.168099 4.66978C0.579904 4.50211 0.973534 4.35853 1.35006 4.23937C1.72659 4.11988 2.08236 4.06008 2.41889 4.06008C3.02363 4.06008 3.49029 4.20624 3.81799 4.49856C4.14569 4.79109 4.30949 5.17031 4.30949 5.63761C4.30949 5.7343 4.29874 5.90466 4.27561 6.14815C4.25303 6.39218 4.21098 6.61577 4.14967 6.81915L3.52374 9.0352C3.47244 9.21319 3.4263 9.41667 3.38618 9.64564C3.34478 9.87311 3.32499 10.0469 3.32499 10.1635C3.32499 10.4577 3.39059 10.6586 3.52212 10.7654C3.65462 10.8722 3.88284 10.9254 4.207 10.9254C4.35918 10.9254 4.53233 10.8984 4.72474 10.8454C4.9166 10.7923 5.05653 10.7458 5.14332 10.705ZM5.30206 1.40136C5.30206 1.78747 5.15655 2.11721 4.86412 2.38834C4.57245 2.66044 4.22098 2.7966 3.80982 2.7966C3.39737 2.7966 3.04504 2.66044 2.75003 2.38834C2.45556 2.1171 2.308 1.78747 2.308 1.40136C2.308 1.01602 2.45556 0.685733 2.75003 0.41116C3.0445 0.137017 3.39747 0 3.80982 0C4.22087 0 4.57245 0.13734 4.86412 0.41116C5.15676 0.685733 5.30206 1.01612 5.30206 1.40136Z"
                    fill="#32404F"/>
              </svg>
            </div>
          </div>
          <div class="new-hazard__column--column3-part2">
            <div class="new-hazard__result new-hazard__result--severity" id="resultSeverity_two"></div>
          </div>
        </div>
      </div>
      <div class="new-hazard__row">
        <div class="new-hazard__column new-hazard__column--column1">
          <label class="risk_priority_number_title">Risikoprioritätszahl</label>
          <div class="tooltip tooltip--expand tooltip--new-hazard new-hazard__info-icon-container"
               data-title="Risikoprioritätszahl nach Anwendung der Massnahmen.">
            <svg class="new-hazard__info-icon" width="6" height="12" viewBox="0 0 6 12" fill="none"
                 xmlns="http://www.w3.org/2000/svg">
              <path
                  d="M5.14332 10.705L4.97565 11.3904C4.47264 11.5889 4.07084 11.7401 3.77164 11.8439C3.47211 11.9482 3.12408 12 2.72755 12C2.11861 12 1.64496 11.8508 1.30715 11.5545C0.96934 11.2571 0.80038 10.8801 0.80038 10.4228C0.80038 10.2458 0.812641 10.0637 0.83813 9.87816C0.863834 9.69243 0.904703 9.48324 0.960628 9.24943L1.58925 7.02446C1.64518 6.8114 1.69271 6.60953 1.73079 6.41863C1.7694 6.22892 1.788 6.05437 1.788 5.89724C1.788 5.61309 1.72917 5.41434 1.61205 5.3026C1.49493 5.19118 1.27144 5.13461 0.939656 5.13461C0.777149 5.13461 0.610126 5.16063 0.439876 5.21097C0.268873 5.26151 0.122713 5.31034 0 5.35573L0.168099 4.66978C0.579904 4.50211 0.973534 4.35853 1.35006 4.23937C1.72659 4.11988 2.08236 4.06008 2.41889 4.06008C3.02363 4.06008 3.49029 4.20624 3.81799 4.49856C4.14569 4.79109 4.30949 5.17031 4.30949 5.63761C4.30949 5.7343 4.29874 5.90466 4.27561 6.14815C4.25303 6.39218 4.21098 6.61577 4.14967 6.81915L3.52374 9.0352C3.47244 9.21319 3.4263 9.41667 3.38618 9.64564C3.34478 9.87311 3.32499 10.0469 3.32499 10.1635C3.32499 10.4577 3.39059 10.6586 3.52212 10.7654C3.65462 10.8722 3.88284 10.9254 4.207 10.9254C4.35918 10.9254 4.53233 10.8984 4.72474 10.8454C4.9166 10.7923 5.05653 10.7458 5.14332 10.705ZM5.30206 1.40136C5.30206 1.78747 5.15655 2.11721 4.86412 2.38834C4.57245 2.66044 4.22098 2.7966 3.80982 2.7966C3.39737 2.7966 3.04504 2.66044 2.75003 2.38834C2.45556 2.1171 2.308 1.78747 2.308 1.40136C2.308 1.01602 2.45556 0.685733 2.75003 0.41116C3.0445 0.137017 3.39747 0 3.80982 0C4.22087 0 4.57245 0.13734 4.86412 0.41116C5.15676 0.685733 5.30206 1.01612 5.30206 1.40136Z"
                  fill="#32404F"/>
            </svg>
          </div>
        </div>
        <div class="new-hazard__column new-hazard__column--column2">
          <div class="new-hazard__result" id="resultRiskPriorityNumber2">
            <div id="resultProbabilityOfOccurrence_two"></div>
            <p>/</p>
            <div id="resultSeverity_three"></div>
          </div>
        </div>
      </div>
      <div class="new-hazard__row new-hazard__button-container">
        <div class="new-hazard__column new-hazard__column--column1 new-hazard__column--empty-column">
        </div>
        <div class="new-hazard__column new-hazard__column--column2 new-hazard__column--empty-column">
        </div>
        <div class="new-hazard__column new-hazard__column--column3 new-hazard__column--button-column">
          <router-link :to="{ name: 'ListView', params: {
            hazardOriginalIdListView: hazardOriginalIdNewHazardForm,}}">
            <div class="button button--cancel button--new-hazard button--new-hazard-cancel" id="cancel">
              Abbrechen
            </div>
          </router-link>
          <router-link :to="{ name: 'ListView', params: {
            hazardNameListView: hazardNameNewHazardForm,
            hazardSituationListView: hazardSituationNewHazardForm,
            hazardDamageListView: hazardDamageNewHazardForm,
            hazardProbabilityOfOccurenceBeforeListView: hazardProbabilityOfOccurenceBeforeNewHazardForm,
            hazardSeverityListView: hazardSeverityNewHazardForm,
            hazardMeasuresListView: hazardMeasuresNewHazardForm,
            hazardProbabilityOfOccurenceAfterListView: hazardProbabilityOfOccurenceAfterNewHazardForm,
            hazardRiskPriorityListView: hazardRiskPriorityNewHazardForm,
            hazardOriginalIdListView: hazardOriginalIdNewHazardForm
          }}"
                       id="router-link--new-hazard-submit">
            <div class="button button--submit button--new-hazard button--new-hazard-submit"
                 id="button--new-hazard-submit">
              Speichern
            </div>
          </router-link>
        </div>
      </div>

    </form>
  </div>

</template>

<script>
export default {
  data() {
    return {
      hazardNameNewHazardForm: "",
      hazardSituationNewHazardForm: "",
      hazardDamageNewHazardForm: [""],
      hazardProbabilityOfOccurenceBeforeNewHazardForm: "",
      hazardSeverityNewHazardForm: "",
      hazardMeasuresNewHazardForm: [""],
      hazardProbabilityOfOccurenceAfterNewHazardForm: "",
      hazardRiskPriorityNewHazardForm: 1,
      hazardOriginalIdNewHazardForm: 0,
      probabilityOfOccurrenceValue: null,
      probabilityOfOccurrenceValue2: null,
      severityValue: null,
      transition: "1s",
      color1: "white",
      color2: "black",
      result1: null,
      result2: null,
      newSeverityValue: null,
      damagaTextfieldNumber: 1,
      measureTextfieldNumber: 1,
    }
  },
  mounted() {
    this.hazardOriginalIdNewHazardForm = this.$route.params.itemIdNewHazard
  },
  updated() {
    let submitButton = document.getElementById("button--new-hazard-submit"),
        submitButtonLink = document.getElementById("router-link--new-hazard-submit")

    if (this.checkNewHazardFields()) {
      if (submitButton !== null && submitButton !== undefined) {
        submitButton.style.opacity = "1.0"
        submitButtonLink.style.pointerEvents = 'auto'
      }
      return false
    } else {
      if (submitButton !== null && submitButton !== undefined) {
        submitButton.style.opacity = "0.4"
        submitButtonLink.style.pointerEvents = 'none'
      }
      return true
    }
  },
  methods: {
    checkNewHazardFields() {
      return this.hazardNameNewHazardForm !== "" &&
          this.hazardSituationNewHazardForm !== "" &&
          this.hazardDamageNewHazardForm[0] !== "" &&
          this.hazardProbabilityOfOccurenceBeforeNewHazardForm !== "" &&
          this.hazardSeverityNewHazardForm !== "" &&
          this.hazardMeasuresNewHazardForm[0] !== "" &&
          this.hazardProbabilityOfOccurenceAfterNewHazardForm !== ""
    },
    displayRadioValueOfProbabilityOfOccurrence(ProbabilityOfOccurrenceRadioButtonGroup) {
      if (ProbabilityOfOccurrenceRadioButtonGroup === 1) {
        this.probabilityOfOccurrenceValue = document.querySelector('input[name="probabilityOfOccurrence"]:checked').value
        document.getElementById("resultProbabilityOfOccurrence").innerHTML = this.probabilityOfOccurrenceValue
      } else {
        this.probabilityOfOccurrenceValue2 = document.querySelector('input[name="probabilityOfOccurrenceTwo"]:checked').value
        document.getElementById("resultProbabilityOfOccurrence_two").innerHTML = this.probabilityOfOccurrenceValue2
      }
      this.checkofProbabilityOfOccurrenceANDSeverity()
    },
    // get value of the checked radio for severity
    displayRadioValueOfSeverity() {
      this.severityValue = document.querySelector('input[name="severity"]:checked').value
      let severityValueField = document.getElementById("resultSeverity")

      severityValueField.innerHTML = this.severityValue
      document.getElementById("resultSeverity_two").innerHTML = this.severityValue
      document.getElementById("resultSeverity_three").innerHTML = this.severityValue

      this.checkofProbabilityOfOccurrenceANDSeverity()
    },
    checkofProbabilityOfOccurrenceANDSeverity() {
      let resultField1 = document.getElementById("resultRiskPriorityNumber")
      let resultField2 = document.getElementById("resultRiskPriorityNumber2")

      if (this.severityValue !== null) {
        this.newSeverityValue = parseInt(this.severityValue, 10)

        if (this.probabilityOfOccurrenceValue !== null) {
          this.result1 = this.probabilityOfOccurrenceValue * this.severityValue
          resultField1.style.transition = this.transition
          resultField1.style.color = this.color1

          if (this.result1 <= 6 && this.newSeverityValue !== 5) {
            resultField1.style.background = "#339C74"
            this.hazardRiskPriorityNewHazardForm = 1
          } else if ((this.result1 >= 7 && this.result1 <= 12 && this.newSeverityValue !== 5) || (this.result1 === 5 && this.newSeverityValue === 5)) {
            resultField1.style.background = "#FBDB34"
            resultField1.style.color = this.color2
            this.hazardRiskPriorityNewHazardForm = 2
          } else {
            resultField1.style.background = "#D63837"
            this.hazardRiskPriorityNewHazardForm = 3
          }
        }

        if (this.probabilityOfOccurrenceValue2 !== null) {
          this.result2 = this.probabilityOfOccurrenceValue2 * this.severityValue
          resultField2.style.transition = this.transition
          resultField2.style.color = this.color1

          if (this.result2 <= 6 && this.newSeverityValue !== 5) {
            resultField2.style.background = "#339C74"
          } else if ((this.result2 >= 7 && this.result2 <= 12 && this.newSeverityValue !== 5) || (this.result2 === 5 && this.newSeverityValue === 5)) {
            resultField2.style.background = "#FBDB34"
            resultField2.style.color = this.color2
          } else {
            resultField2.style.background = "#D63837"
          }
        }
      }
    },
    addNewTextfield(TopicofnewTextfield, typeOfCalculation) {
      if (TopicofnewTextfield === 'damage') {
        if (typeOfCalculation === 'plus') {
          this.damagaTextfieldNumber++
        } else if (typeOfCalculation === 'minus') {
          this.damagaTextfieldNumber--
          this.hazardDamageNewHazardForm.length = this.damagaTextfieldNumber
        }
      } else if (TopicofnewTextfield === 'measure') {
        if (typeOfCalculation === 'plus') {
          this.measureTextfieldNumber++
        } else if (typeOfCalculation === 'minus') {
          this.measureTextfieldNumber--
          this.hazardMeasuresNewHazardForm.length = this.measureTextfieldNumber
        }
      }
    }
  }
}
</script>