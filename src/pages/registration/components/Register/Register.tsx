import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import Select from "react-select";
import Field from "/svgs/registration/field2.svg";
import styles from "./Register.module.scss";
import { useEffect, useState, forwardRef, useRef } from "react";
import { useForm, Controller } from "react-hook-form";
import axios from "axios";
import statesData from "./cities.json";
import Left from "/svgs/registration/leftarr.svg";
import Right from "/svgs/registration/rightarr.svg";
import DropDown from "/svgs/registration/dropdown.svg";

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
    .matches(/^[1-9]\d{9}$/, "Invalid number")
    .required("Mobile number is required"),
  college_id: yup.string().required("College is required"),
  year: yup.string().required("Field is required"),
  state: yup.string().required("State is required"),
  city: yup.string().required("City is required"),
});

type FormData = yup.InferType<typeof registrationSchema>;

type PropsType = {
  onClickNext: () => void;
  userEmail: string;
  setUserData: React.Dispatch<React.SetStateAction<any>>;
};

type GenderOption = {
  value: "M" | "F" | "O";
  label: string;
};

const genderOptions: GenderOption[] = [
  { value: "M", label: "Male" },
  { value: "F", label: "Female" },
  { value: "O", label: "Other" },
];

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

    const dropDownRef = useRef<(HTMLImageElement | null)[]>([]);
    
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
      reset,
      watch,
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
      },
    });

useEffect(() => {
  const savedData = localStorage.getItem("registrationFormData");
  if (savedData) {
    try {
      const parsedData = JSON.parse(savedData);
      reset({
        ...parsedData,
        email_id: userEmail,
      });
      if (parsedData.state) {
        setSelectedState(parsedData.state);
      }
    } catch (err) {
      console.error("Failed to parse local storage data:", err);
      localStorage.removeItem("registrationFormData");
    }
  }
}, [reset, userEmail]);
    useEffect(() => {
  const subscription = watch((value) => {
    localStorage.setItem("registrationFormData", JSON.stringify(value));
  });

  return () => subscription.unsubscribe();
}, [watch]);

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
    const isTablet = window.matchMedia(
      "(max-width: 1200px) and (max-aspect-ratio: 1.45) "
    ).matches;
    const isMobile = window.matchMedia(
      "(max-width: 1200px) and (max-aspect-ratio: 0.75) "
    ).matches;
    const customStyle = {
      control: (provided: any) => ({
        ...provided,
        outline: "none",
        border: "none",
        height: "100%",
        width: "100%",
        textAlign: "center",
        borderRadius: "0",
        boxShadow: "none",
        cursor: "pointer",
      }),
      noOptionsMessage: (provided: any, state: any) => ({
        ...provided,
        backgroundColor: state.isFocused ? "#FFF9E9" : "#131313CC",
        color: state.isFocused ? "#1E1E1E" : "#FFF9E9",
        textAlign: "center",
        cursor: "pointer",
        padding: "0.5vw 0",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        font: `100 ${
          isMobile ? 4.2 : isTablet ? 3.2 : 1.5
        }vw Abhaya Libre Extrabold`,
        "&:hover": {
          backgroundColor: state.isFocused ? "#FFF9E9" : "#1E1E1E",
        },
      }),
      dropdownIndicator: () => ({
        display: "none",
      }),
      indicatorSeparator: () => ({
        display: "none",
      }),
      placeholder: (provided: any, state: any) => ({
        ...provided,
        width: "100%",
        height: "100%",
        color: "#e2dccb",
        font: `100 ${
          isMobile ? 4.2 : isTablet ? 3.2 : 1.5
        }vw Abhaya Libre Extrabold`,
        display: state.hasValue || state.isFocused ? "none" : "flex",
        alignItems: "center",
        justifyContent: "center",
      }),
      input: (provided: any) => ({
        ...provided,
        position: "absolute",
        top: "50%",
        left: "50%",
        maxWidth: "65%",
        overflow: "hidden",
        transform: "translate(-50%, -50%)",
      }),
      singleValue: (provided: any) => ({
        ...provided,
        position: "absolute",
        top: "50%",
        left: "50%",
        transform: "translate(-50%, -50%)",
        width: "65%",
      }),
      valueContainer: () => ({
        width: "100%",
        height: "100%",
        color: "#e2dccb",
        font: `100 ${
          isMobile ? 4.2 : isTablet ? 3.2 : 1.5
        }vw Abhaya Libre Extrabold`,
      }),
      menuPortal: (provided: any) => ({
        ...provided,
        zIndex: 9999,
      }),
      menu: (provided: any) => ({
        ...provided,
        zIndex: 4,
        backgroundColor: "#1E1E1E",
        maxHeight: `${isMobile ? 40 : isTablet ? 30 : 10}vw`,
        overflow: "hidden",
        scrollbarWidth: "none",
        "::-webkit-scrollbar": {
          display: "none",
        },
        border: "1px solid #FFF9E9",
        borderRadius: "5px",
      }),
      menuList: (provided: any) => ({
        ...provided,
        zIndex: 10,
        maxHeight: `${isMobile ? 40 : isTablet ? 30 : 10}vw`,
        scrollbarWidth: "none",
        "::-webkit-scrollbar": {
          display: "none",
        },
      }),
      option: (provided: any, state: any) => ({
        ...provided,
        backgroundColor: state.isFocused ? "#FFF9E9" : "#131313CC",
        color: state.isFocused ? "#1E1E1E" : "#FFF9E9",
        textAlign: "center",
        cursor: "pointer",
        padding: "0.5vw 0",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        font: `100 ${
          isMobile ? 4.4 : isTablet ? 3.2 : 1.5
        }vw Abhaya Libre Extrabold`,
        "&:hover": {
          backgroundColor: state.isFocused ? "#FFF9E9" : "#1E1E1E",
        },
      }),
    };

    const onSubmit = (data: any) => {
      console.log("Form Data:", data);
      setUserData({
        ...data,
        email_id: userEmail,
      });
      onClickNext();
      
      localStorage.removeItem("registrationFormData");
    };

    return (
      <div className={styles.registerContainer} ref={ref}>
        <form
          autoComplete="off"
          onSubmit={handleSubmit(onSubmit)}
          className={styles.registrationForm}
        >
          <div className={styles.formColumns}>
            <div className={styles.left}>
              <div className={styles.name}>
                <div className={styles.sameline}>
                  <img src={Left} alt="Glow" />
                  <label>NAME</label>
                  <img src={Right} alt="Glow" />
                </div>
                <div className={styles.clouds}>
                  <img src={Field} alt="Field" className={styles.fieldImg} />
                  <input {...register("name")} />
                </div>
                <p className={styles.error}>{errors.name?.message}</p>
              </div>

              <div className={styles.email}>
                <div className={styles.sameline}>
                  <img src={Left} alt="Glow" />
                  <label>EMAIL </label>
                  <img src={Right} alt="Glow" />
                </div>
                <div className={styles.clouds}>
                  <img src={Field} alt="Field" className={styles.fieldImg} />
                  <input value={userEmail} disabled placeholder={userEmail} />
                </div>
                <p className={styles.error}>{errors.email_id?.message}</p>
              </div>

              <div className={styles.gender}>
                <div className={styles.sameline}>
                  <img src={Left} alt="Glow" />
                  <label>GENDER</label>
                  <img src={Right} alt="Glow" />
                </div>
                <div className={styles.clouds}>
                  <img src={Field} alt="Field" className={styles.fieldImg} />

                  <Controller
                    name="gender"
                    control={control}
                    render={({ field }) => (
                      <Select<GenderOption, false>
                        {...field}
                        menuPortalTarget={document.body}
                        options={genderOptions}
                        styles={customStyle}
                        onChange={(val) => field.onChange(val?.value || "")}
                        value={
                          genderOptions.find(
                            (opt) => opt.value === field.value
                          ) || null
                        }
                        unstyled
                        placeholder="--SELECT--"
                        className={styles["react-select-container"]}
                        classNamePrefix="react-select"
                        onMenuOpen={() => {
                          dropDownRef.current[0]!.classList.add(
                            styles.rotateDropDown
                          );
                        }}
                        onMenuClose={() => {
                          dropDownRef.current[0]!.classList.remove(
                            styles.rotateDropDown
                          );
                        }}
                      />
                    )}
                  />

                  <img
                    src={DropDown}
                    alt="dropDown"
                    className={styles.dropDown}
                    ref={(el) => {
                      dropDownRef.current[0] = el;
                    }}
                  />
                </div>
                <p className={styles.error}>{errors.gender?.message}</p>
              </div>

              <div className={styles.mobile}>
                <div className={styles.sameline}>
                  <img src={Left} alt="Glow" />
                  <label>MOBILE NUMBER </label>
                  <img src={Right} alt="Glow" />
                </div>
                <div className={styles.clouds}>
                  <img src={Field} alt="Field" className={styles.fieldImg} />
                  <input {...register("phone")} />
                </div>
                <p className={styles.error}>{errors.phone?.message}</p>
              </div>
            </div>

            <div className={styles.right}>
              <div className={styles.college}>
                <div className={styles.sameline}>
                  <img src={Left} alt="Glow" />
                  <label>COLLEGE NAME </label>
                  <img src={Right} alt="Glow" />
                </div>
                <div className={styles.clouds}>
                  <img src={Field} alt="Field" className={styles.fieldImg} />
                  <Controller
                    name="college_id"
                    control={control}
                    render={({ field }) => (
                      <Select
                        {...field}
                        menuPortalTarget={document.body}
                        options={collegeOptions}
                        styles={customStyle}
                        onChange={(val) => field.onChange(val?.value || "")}
                        value={
                          field.value
                            ? collegeOptions.find(
                                (c) => c.value === field.value
                              ) || null
                            : null
                        }
                        unstyled
                        placeholder="--SELECT--"
                        className={styles["react-select-container"]}
                        classNamePrefix="react-select"
                        onMenuOpen={() => {
                          setTimeout(() => {
                            dropDownRef.current[1]!.classList.add(
                              styles.rotateDropDown
                            );
                          }, 100);
                        }}
                        onMenuClose={() => {
                          dropDownRef.current[1]!.classList.remove(
                            styles.rotateDropDown
                          );
                        }}
                      />
                    )}
                  />
                  <img
                    src={DropDown}
                    alt="dropDown"
                    className={styles.dropDown}
                    ref={(el) => {
                      dropDownRef.current[1] = el;
                    }}
                  />
                </div>
                <p className={styles.error}>{errors.college_id?.message}</p>
              </div>

              <div className={styles.year}>
                <div className={styles.sameline}>
                  <img src={Left} alt="Glow" />
                  <label>YEAR OF STUDY </label>
                  <img src={Right} alt="Glow" />
                </div>
                <div className={styles.clouds}>
                  <img src={Field} alt="Field" className={styles.fieldImg} />
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
                </div>
                <p className={styles.error}>{errors.year?.message}</p>
              </div>

              <div className={styles.states}>
                <div className={styles.sameline}>
                  <img src={Left} alt="Glow" />
                  <label>STATE</label>
                  <img src={Right} alt="Glow" />
                </div>
                <div className={styles.clouds}>
                  <img src={Field} alt="Field" className={styles.fieldImg} />
                  <Controller
                    name="state"
                    control={control}
                    render={({ field }) => (
                      <Select
                        {...field}
                        menuPortalTarget={document.body}
                        unstyled
                        options={getFilteredOptions(inputValue)}
                        styles={customStyle}
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
                        placeholder="--SELECT--"
                        className={styles["react-select-container"]}
                        classNamePrefix="react-select"
                        onMenuOpen={() => {
                          dropDownRef.current[2]!.classList.add(
                            styles.rotateDropDown
                          );
                        }}
                        onMenuClose={() => {
                          dropDownRef.current[2]!.classList.remove(
                            styles.rotateDropDown
                          );
                        }}
                      />
                    )}
                  />
                  <img
                    src={DropDown}
                    alt="dropDown"
                    className={styles.dropDown}
                    ref={(el) => {
                      dropDownRef.current[2] = el;
                    }}
                  />
                </div>
                <p className={styles.error}>{errors.state?.message}</p>
              </div>

              <div className={styles.city}>
                <div className={styles.sameline}>
                  <img src={Left} alt="Glow" />
                  <label>CITY </label>
                  <img src={Right} alt="Glow" />
                </div>
                <div className={styles.clouds}>
                  <img src={Field} alt="Field" className={styles.fieldImg} />
                  <Controller
                    name="city"
                    control={control}
                    render={({ field }) => (
                      <Select
                        {...field}
                        menuPortalTarget={document.body}
                        menuPlacement="top"
                        options={availableCities}
                        styles={customStyle}
                        isDisabled={!selectedState}
                        onChange={(val) => field.onChange(val?.value || "")}
                        value={
                          field.value
                            ? availableCities.find(
                                (c) => c.value === field.value
                              ) || null
                            : null
                        }
                        unstyled
                        placeholder="--SELECT--"
                        className={styles["react-select-container"]}
                        classNamePrefix="react-select"
                        onMenuOpen={() => {
                          dropDownRef.current[3]!.classList.add(
                            styles.rotateDropDown
                          );
                        }}
                        onMenuClose={() => {
                          dropDownRef.current[3]!.classList.remove(
                            styles.rotateDropDown
                          );
                        }}
                      />
                    )}
                  />
                  <img
                    src={DropDown}
                    alt="dropDown"
                    className={styles.dropDown}
                    ref={(el) => {
                      dropDownRef.current[3] = el;
                    }}
                  />
                </div>
                <p className={styles.error}>{errors.city?.message}</p>
              </div>
            </div>
          </div>
        </form>

        <button
          className={styles.confirmButton}
          type="submit"
          onClick={handleSubmit(onSubmit)}
        >
          <svg
            width="98"
            height="8"
            viewBox="0 0 98 8"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className={styles.confirmIcon}
            aria-label="Next"
          >
            <path
              d="M-0.000976562 4.07317C2.77052 4.07317 73.6558 6.02439 91.9262 7L96.999 4.07317L91.9262 1L-0.000976562 4.07317Z"
              fill="white"
              stroke="white"
              strokeWidth="0.16"
            />
          </svg>
          NEXT
          <svg
            width="98"
            height="8"
            viewBox="0 0 98 8"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className={styles.confirmIcon}
            aria-label="Next"
          >
            <path
              d="M-0.000976562 4.07317C2.77052 4.07317 73.6558 6.02439 91.9262 7L96.999 4.07317L91.9262 1L-0.000976562 4.07317Z"
              fill="white"
              stroke="white"
              strokeWidth="0.16"
            />
          </svg>
        </button>
      </div>
    );
  }
);

export default Register;
