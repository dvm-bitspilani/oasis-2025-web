import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import Select from "react-select";
//import type { SingleValue } from "react-select";
import Field from "/svgs/registration/field2.svg";
import styles from "./Register.module.scss";
import Drop from "/svgs/registration/Drop.svg";
import { useEffect, useState, forwardRef } from "react";
import { useForm, Controller } from "react-hook-form";
import axios from "axios";

import statesData from "./cities.json";
import Left from "/svgs/registration/leftarr.svg";
import Right from "/svgs/registration/rightarr.svg";
import Gen from "/svgs/registration/field3.svg";
import { components } from "react-select";

const CustomDropdownIndicator = (props: any) => {
  return (
    <components.DropdownIndicator {...props}>
      <img
        src={Drop}
        alt="Dropdown"
        style={{
          width: "1.2rem",
          display: "none",
          paddingLeft: "2vw",
          height: "1.2rem",
          pointerEvents: "none",
        }}
      />
    </components.DropdownIndicator>
  );
};

const stateOptions = statesData.map((item) => ({
  value: item.state,
  label: item.state,
}));

const registrationSchema = yup.object({
  name: yup.string().required("Name is required"),
  email_id: yup.string().email("Invalid email"),
  gender: yup.string().required("Gender is required"),
  phone: yup
    .string()
    .matches(/^\+?\d{10,15}$/, "Invalid mobile number")
    .required("Mobile number is required"),
  college_id: yup.string().required("College is required"),
  year: yup.string().required("Year of study is required"),
  state: yup.string().required("State is required"),
  city: yup.string().required("City is required"),
  date: yup.date().required("Date of Birth is required"),
  //  referral: yup.string().nullable().optional(),
});

type FormData = yup.InferType<typeof registrationSchema>;

type PropsType = {
  onClickNext: () => void;
  userEmail: string;
  setUserData: React.Dispatch<React.SetStateAction<any>>;
};

const Register = forwardRef<HTMLDivElement, PropsType>(
  function RegisterComponent(props, ref) {
    const { onClickNext, userEmail, setUserData } = props;
    const [selectedState, setSelectedState] = useState("");
    const [availableCities, setAvailableCities] = useState<
      { value: string; label: string }[]
    >([]);
    const [collegeOptions, setCollegeOptions] = useState<
      { value: string; label: string }[]
    >([]);
    const [inputValue, setInputValue] = useState("");

    useEffect(() => {
      axios
        .get("https://bits-oasis.org/2025/main/registrations/get_college/")
        .then((response) => {
          setCollegeOptions(
            response.data.data.map((college: { id: number; name: string }) => ({
              value: String(college.id),
              label: college.name,
            }))
          );
        })
        .catch((error) => console.error("Error fetching colleges:", error));
    }, []);

    const getAvailableCities = (stateName: string) =>
      (statesData.find((item) => item.state === stateName)?.cities ?? []).map(
        (city) => ({ value: city, label: city })
      );

    useEffect(() => {
      setAvailableCities(getAvailableCities(selectedState));
    }, [selectedState]);

    const {
      register,
      handleSubmit,
      formState: { errors },
      setValue,
      control,
    } = useForm<FormData>({
      resolver: yupResolver(registrationSchema as any),
      defaultValues: {
        name: "",
        email_id: userEmail,
        gender: "",
        phone: "",
        college_id: "",
        year: "",
        state: "",
        city: "",
        //referral: null,
        date: undefined,
      },
    });

    const getFilteredOptions = (input: string) => {
      if (!input) return stateOptions;
      const inputLower = input.toLowerCase();
      const startsWith = stateOptions.filter((opt) =>
        opt.label.toLowerCase().startsWith(inputLower)
      );
      const contains = stateOptions.filter(
        (opt) =>
          !opt.label.toLowerCase().startsWith(inputLower) &&
          opt.label.toLowerCase().includes(inputLower)
      );
      return [...startsWith, ...contains];
    };
    const isMobile =
      window.innerWidth < 1200 && window.innerWidth / window.innerHeight < 0.75;
    const customStyles = {
      noOptionsMessage: (provided: any) => ({
        ...provided,
        color: "white",
        backgroundColor: "#00000061",
        padding: "10px",
        textAlign: "center",
      }),
      control: (provided: any, state: any) => ({
        ...provided,
        paddingLeft: 0,
        paddingRight: 0,
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        boxShadow: state.isFocused ? "none" : provided.boxShadow,
        outline: "none",
        background: "transparent",
        border: "none",
        height: isMobile ? "0vh" : "3vw",
        paddingBottom: isMobile ? "5vw" : "0vw",
      }),
      menuList: (provided: any) => ({
        ...provided,
        padding: 0,
        margin: 0,
        backgroundColor: "#2e0505",
        color: "white",
        borderRadius: "10px",
        scrollbarWidth: "thin",
      }),
      singleValue: (provided: any) => ({
        ...provided,
        color: "white",
        textAlign: "center",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "3vw",
        width: "80vw",
        paddingLeft: isMobile ? "0%" : "0%",
        paddingTop: isMobile ? "0vw" : "0vw",
      }),
      input: (provided: any) => ({
        ...provided,
        textAlign: "center",
        padding: 0,
        margin: 0,
        color: "white",
        zIndex: "5",
      }),
      placeholder: (provided: any) => ({
        ...provided,
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        width: "100%",
        textAlign: "center",
        color: "white",
        margin: 0,
        zIndex: "5",
        height: "3vw",

        whiteSpace: "nowrap",
      }),
      menu: (provided: any) => ({
        ...provided,
        marginTop: 0,
        width: isMobile ? "80vw" : "30vw",
        borderRadius: "10px",
        overflow: "hidden",
        zIndex: 10,
      }),
      option: (provided: any, state: any) => ({
        ...provided,
        backgroundColor: state.isFocused ? "rgba(0,20,80,0.8)" : "#2e0505",
        color: "white",
        cursor: "pointer",
      }),
      valueContainer: (provided: any) => ({
        ...provided,
        width: "100%",
        padding: 0,
        height: "3vw",
        background: "transparent",
        color: "white",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        textAlign: "center",
      }),
      dropdownIndicator: (provided: any) => ({
        ...provided,
        color: "white",
        display: "none",
        cursor: "pointer",
      }),
      indicatorSeparator: () => ({
        display: "none",
      }),
    };
    const customStylesGender = {
      control: (provided: any, state: any) => ({
        ...provided,
        paddingLeft: 0,
        paddingRight: 0,
        display: "flex",
        boxShadow: state.isFocused ? "none" : provided.boxShadow,
        outline: "none",
        justifyContent: "center",
        alignItems: "center",
        background: "transparent",
        border: "none",
        height: "3vw",
        width: isMobile ? "33.6vw" : "100%",
      }),
      menuList: (provided: any) => ({
        ...provided,
        padding: 0,
        margin: 0,
        backgroundColor: "#2e0505",
        color: "white",
        borderRadius: "10px",
        scrollbarWidth: "thin",
      }),
      singleValue: (provided: any) => ({
        ...provided,
        color: "white",
        textAlign: "center",
        height: "2.3rem",
        zIndex: "5",
        paddingLeft: 0,
        width: isMobile ? "33.6vw" : "100%",
      }),
      input: (provided: any) => ({
        ...provided,
        textAlign: "center",
        padding: 0,
        margin: 0,
        display: "flex",
        width: isMobile ? "33.6vw" : "100%",
        color: "white",
      }),
      placeholder: (provided: any, state: any) => ({
        ...provided,
        display:
          state.isFocused || state.selectProps.inputValue || state.value
            ? "none"
            : "block",
        color: "white",
        zIndex: "5",
        width: isMobile ? "33.6vw" : "100%",
        textAlign: "center",
      }),
      menu: (provided: any) => ({
        ...provided,
        marginTop: 0,
        width: isMobile ? "33.6vw" : "12.6vw",
        borderRadius: "10px",
        overflow: "hidden",
        zIndex: 10,
      }),
      option: (provided: any, state: any) => ({
        ...provided,
        backgroundColor: state.isFocused ? "rgba(0,20,80,0.8)" : "#2e0505",
        color: "white",
        cursor: "pointer",
      }),
      valueContainer: (provided: any) => ({
        ...provided,
        width: "100%",
        padding: 0,
        height: "2.3rem",
        background: "transparent",
        color: "white",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        textAlign: "center",
      }),
      indicatorSeparator: () => ({
        display: "none",
      }),
    };

    const onSubmit = (data: any) => {
      setUserData({
        ...data,
        email_id: userEmail,
      });
      onClickNext();
    };

    return (
      <div className={styles.registerContainer} ref={ref}>
        <form
          onSubmit={handleSubmit(onSubmit)}
          className={styles.registrationForm}
        >
          <div className={styles.formColumns}>
            <div className={styles.left}>
              <div className={styles.name}>
                <div className={styles.sameline}>
                  <img src={Left} alt="" />
                  <label>NAME</label>
                  <img src={Right} alt="" />
                </div>
                <div className={styles.clouds}>
                  <img src={Field} alt="" />
                  <input {...register("name")} />
                </div>
                <p>{errors.name?.message}</p>
              </div>

              <div className={styles.email}>
                <div className={styles.sameline}>
                  <img src={Left} alt="" />
                  <label>EMAIL </label>
                  <img src={Right} alt="" />
                </div>
                <div className={styles.clouds}>
                  <img src={Field} alt="" />
                  <input value={userEmail} disabled placeholder={userEmail} />
                </div>
                <p>{errors.email_id?.message}</p>
              </div>

              <div className={styles.together}>
                <div className={styles.fields}>
                  <div className={styles.field1}>
                    <div className={styles.sameline}>
                      <label>GENDER </label>
                    </div>
                    <div className={styles.clouds}>
                      <img src={Gen} alt="" />
                      <Controller
                        name="gender"
                        control={control}
                        render={({ field }) => (
                          <Select
                            {...field}
                            options={[
                              { value: "M", label: "Male" },
                              { value: "F", label: "Female" },
                              { value: "O", label: "Other" },
                            ]}
                            styles={customStylesGender}
                            placeholder="Gender"
                            onChange={(val) => field.onChange(val?.value || "")}
                            value={
                              field.value
                                ? { value: field.value, label: field.value }
                                : null
                            }
                            className={`${styles.selection} ${styles.genderSelect}`}
                            classNamePrefix="Select"
                            components={{
                              DropdownIndicator: CustomDropdownIndicator,
                            }}
                          />
                        )}
                      />
                    </div>
                    <p>{errors.gender?.message}</p>
                  </div>
                </div>
              </div>

              <div className={styles.mobile}>
                <div className={styles.sameline}>
                  <img src={Left} alt="" />
                  <label>MOBILE NUMBER </label>
                  <img src={Right} alt="" />
                </div>
                <div className={styles.clouds}>
                  <img src={Field} alt="" />
                  <input {...register("phone")} />
                </div>
                <p>{errors.phone?.message}</p>
              </div>
            </div>

            <div className={styles.right}>
              <div className={styles.college}>
                <div className={styles.sameline}>
                  <img src={Left} alt="" />
                  <label>COLLEGE NAME </label>
                  <img src={Right} alt="" />
                </div>
                <div className={styles.clouds}>
                  <img src={Field} alt="" />
                  <Controller
                    name="college_id"
                    control={control}
                    render={({ field }) => (
                      <Select
                        {...field}
                        options={collegeOptions}
                        styles={customStyles}
                        placeholder="Select College"
                        onChange={(val) => field.onChange(val?.value || "")}
                        value={
                          field.value
                            ? collegeOptions.find(
                                (c) => c.value === field.value
                              ) || null
                            : null
                        }
                        className={styles.selection}
                        classNamePrefix="Select"
                      />
                    )}
                  />
                </div>
                <p>{errors.college_id?.message}</p>
              </div>

              <div className={styles.year}>
                <div className={styles.sameline}>
                  <img src={Left} alt="" />
                  <label>YEAR OF STUDY </label>
                  <img src={Right} alt="" />
                </div>
                <div className={styles.clouds}>
                  <img src={Field} alt="" className={styles.rightselect} />
                  <fieldset
                    className={styles.radioGroup}
                    aria-label="Year of Study"
                  >
                    {["1", "2", "3", "4", "5"].map((year) => (
                      <label key={year} className={styles.radioLabel}>
                        <input
                          type="radio"
                          value={year}
                          {...register("year")}
                          className={styles.radioInput}
                        />
                        <span className={styles.yearNumber}>{year}</span>
                      </label>
                    ))}
                  </fieldset>
                  <p className={styles.error}>{errors.year?.message}</p>
                </div>
              </div>

              <div className={styles.states}>
                <div className={styles.sameline}>
                  <img src={Left} alt="" />
                  <label>STATE</label>
                  <img src={Right} alt="" />
                </div>
                <div className={styles.clouds}>
                  <img src={Field} alt="" />
                  <Controller
                    name="state"
                    control={control}
                    render={({ field }) => (
                      <Select
                        {...field}
                        options={getFilteredOptions(inputValue)}
                        styles={customStyles}
                        onInputChange={(value) => setInputValue(value)}
                        filterOption={() => true}
                        value={
                          field.value
                            ? stateOptions.find(
                                (option) => option.value === field.value
                              ) || null
                            : null
                        }
                        onChange={(option) => {
                          const val = option?.value || "";
                          field.onChange(val);
                          setSelectedState(val);
                          setValue("city", "", { shouldValidate: true });
                        }}
                        placeholder="Enter State"
                        classNamePrefix="react-select"
                        className={styles.selection}
                      />
                    )}
                  />
                </div>
              </div>

              <div className={styles.city}>
                <div className={styles.sameline}>
                  <img src={Left} alt="" />
                  <label>CITY </label>
                  <img src={Right} alt="" />
                </div>
                <div className={styles.clouds}>
                  <img src={Field} alt="" />
                  <Controller
                    name="city"
                    control={control}
                    render={({ field }) => (
                      <Select
                        {...field}
                        options={availableCities}
                        styles={customStyles}
                        placeholder="Select City"
                        isDisabled={!selectedState}
                        onChange={(val) => field.onChange(val?.value || "")}
                        value={
                          field.value
                            ? availableCities.find(
                                (c) => c.value === field.value
                              ) || null
                            : null
                        }
                        className={styles.selection}
                      />
                    )}
                  />
                </div>
                <p>{errors.city?.message}</p>
              </div>
            </div>
          </div>
        </form>

        <button
          className={styles.confirmButton}
          type="submit"
          onClick={handleSubmit(onSubmit)}
        >
          <span> NEXT</span>
        </button>
      </div>
    );
  }
);

export default Register;
