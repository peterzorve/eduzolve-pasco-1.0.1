
import { SquareRoot, superscript, subscript, BoldText, ItalicText, Fraction, ShortFraction, LongFraction, MixedFraction, Isotopes } from "@/mathnotation"

const path = "@/assets/images/pastquestions-figures/coremathematics/coremathematicsA/coremathematics-"

export const COREMATHEMATICSA2009 = [

{
id: "question1",
question: "1. If y = 9(²/₃)ˣ, find y when x = 3",
A: "2/3",
B: "4/5",
C: "8/3",
D: "9/3",
answer: "C. 8/3",
correctLetter: "C",
correctOption: 3,
},

{
id: "question2",
question: "2. Multiply 3.6 x 10² by 9.5 x 10⁻⁴ and leave the answer in standard form.",
A: "3.42 x 10³",
B: "3.42 x 10²",
C: "3.42 x 10⁻¹",
D: "3.42 x 10⁻²",
answer: "C. 3",
correctLetter: "C",
correctOption: 3,
},

{
id: "question3",
question: "3. Given that x α y/z² such that x = 2 when y = 6 and z = 3 calculate the constant of proportionality.",
A: "2",
B: "3",
C: "4",
D: "6",
answer: "B. 3",
correctLetter: "B",
correctOption: 2,
},

{
id: "question4",
question: "4. If log₁₀3 = x and log₁₀5 = y, write an expression for log₁₀75 in terms of x and y.",
A: "x + y²",
B: "x + 2y",
C: "2xy",
D: "xy²",
answer: "B. x + 2y",
correctLetter: "B",
correctOption: 2,
},

{
id: "question5",
question: "5. If the logarithm of a number to base 10 is 2.6025, find the number.",
A: "4004",
B: "400.4",
C: "40.04",
D: "4.004",
answer: "B. 400",
correctLetter: "B",
correctOption: 2,
},

{
instruction: "The Venn diagram shows three subsets X, Y and Z of a universal set U. Use it to answer Questions 6 and 7.",
id: "question6",
question: "6. Find Y U Z",
A: "{1, 2, 3}",
B: "{4, 7, 8}",
C: "{1, 2, 7, 8}",
D: "{1, 2, 3, 4, 7, 8}",
answer: "D. {1,2,3,4,7,8}",
correctLetter: "D",
correctOption: 4,
questionFigure: require(path + "2009-A-Q-6.png"),
imageRatio: 1,
},

{
id: "question7",
question: "7. Find X¹ ∩ Y",
A: "{3, 4}",
B: "{7, 8}",
C: "{9, 10}",
D: "{1, 2, 7, 8}",
answer: "D. {1, 2, 7, 8}",
correctLetter: "D",
correctOption: 4,
},

{
id: "question8",
question: "8. Find the value of a² - 3ab + b³ when a = 2 and b = -3.",
A: "49",
B: "13",
C: "-5",
D: "-19",
answer: "C. -5",
correctLetter: "C",
correctOption: 3,
},

{
id: "question9",
question: "9. Find the value of x in the equations: \n2x + 2y = 3 \nx - y = 21",
A: "1",
B: "2",
C: "3",
D: "4",
answer: "B. 2",
correctLetter: "B",
correctOption: 2,
},

{
id: "question10",
question: "10. For what value of x is (x - 3) / (x² + 5x - 6) equal to zero?",
A: "3",
B: "1",
C: "0",
D: "-3",
answer: "A. 3",
correctLetter: "A",
correctOption: 1,
},

{
id: "question11",
question: "11. Two consecutive integers are such that the greater added to twice the smaller gives 52. Find the numbers.",
A: "15, 16",
B: "16, 17",
C: "17, 18",
D: "18, 19",
answer: "C. 17, 18",
correctLetter: "C",
correctOption: 3,
},

{
id: "question12",
question: "12. Solve the equation (x - 2)/3 + 3/2 = x/2",
A: "5",
B: "4",
C: "2",
D: "-1",
answer: "A. 5",
correctLetter: "A",
correctOption: 1,
},

{
id: "question13",
question: "13. Factorize 6x² + 5xy -6y²",
A: "(3x + 2y)(2x - 3y)",
B: "(3x - 2y)(2x + 3y)",
C: "(3x + 2y)(2x + 3y)",
D: "(3x - 2y)(2x - 3y)",
answer: "B. (3x- 2y)(2x + 3y)",
correctLetter: "B",
correctOption: 2,
},

{
id: "question14",
question: "14. What should be added to k² - ¹/₂ k to make it a perfect square?",
A: "-1/16",
B: "-1/4",
C: "1/4",
D: "1/16",
answer: "D. 1/16",
correctLetter: "D",
correctOption: 4,
},

{
id: "question15",
question: "15. Simplify: (2a + ¹/₃)² - (2a  - ¹/₃)²",
A: "-8a²",
B: "2/a",
C: "8a/3",
D: "-8a/3",
answer: "C. 8a/3",
correctLetter: "C",
correctOption: 3,
},

{
id: "question16",
question: "16. The volume of a cylinder with a cross sectional area 88cm² is 792cm3. Find the height of the cylinder.",
A: "3cm",
B: "9cm",
C: "18cm",
D: "27cm",
answer: "B. 9cm",
correctLetter: "B",
correctOption: 2,
},

{
id: "question17",
question: "17. Find, in terms of n, the length of an arc which subtends an angle of 60° at the centre of a circle of radius 6 cm.",
A: "π cm",
B: "2π cm",
C: "3π cm",
D: "5π cm",
answer: "B. 2π cm",
correctLetter: "B",
correctOption: 2,
},

{
id: "question18",
instruction: "18. In the diagram, Y is the centre of the small circle while Z is the centre of the big circle. If |XY| = 14 cm, ",
question: "what percentage of the whole figure is shaded?",
A: "25%",
B: "60%",
C: "75%",
D: "80%",
answer: "C. 75%",
correctLetter: "C",
correctOption: 3,
questionFigure: require(path + "2009-A-Q-18.png"),
imageRatio: 1,
},

{
id: "question19",
instruction: "19. Find the value of x in the diagram.",
question: " ",
A: "20⁰",
B: "30⁰",
C: "40⁰",
D: "50⁰",
answer: "B. 30⁰",
correctLetter: "B",
correctOption: 2,
questionFigure: require(path + "2009-A-Q-19.png"),
imageRatio: 1,
},

{
id: "question20",
instruction: "20. In the diagram, PP'//QQ' and RR'//SS'. If ∠P'TS'= x° and ∠RUQ = 60°,",
question: "find the value ofx.",
A: "30",
B: "40",
C: "60",
D: "70",
answer: "C. 60",
correctLetter: "C",
correctOption: 3,
questionFigure: require(path + "2009-A-Q-20.png"),
imageRatio: 1.0,
},


{
id: "question21",
instruction: "21. Find the value of x in the diagram",
question: " ",
A: "27°",
B: "36°",
C: "81°",
D: "117°",
answer: "B. ",
correctLetter: "B",
correctOption: 2,
questionFigure: require(path + "2009-A-Q-21.png"),
imageRatio: 1.0,
},

{
id: "question22",
instruction: "22. In the diagram, find the value of y.",
question: " ",
A: "120",
B: "125",
C: "140",
D: "145",
answer: "B. 125",
correctLetter: "B",
correctOption: 2,
questionFigure: require(path + "2009-A-Q-22.png"),
imageRatio: 1,
},

{
id: "question23",
instruction: "23. In the diagram, PS//QR, QP = PT and ∠PTR = 130°.",
question: "Find ∠QPS",
A: "70°",
B: "100°",
C: "130°",
D: "140°",
answer: "C. 130°",
correctLetter: "C",
correctOption: 3,
questionFigure: require(path + "2009-A-Q-23.png"),
imageRatio: 1.0,
},

{
id: "question25",
instruction: "25. In the diagram, |LM| = 14 cm, ∠LMN=90° , ∠LNM=60° and ∠LPM = 30°,",
question: "find |NP|. ",
A: "32.4 cm",
B: "18.2 cm",
C: "16.2 cm",
D: "8.1 cm",
answer: " ",
correctLetter: " ",
correctOption: 0,
questionFigure: require(path + "2009-A-Q-25.png"),
imageRatio: 1,
},

{
id: "question26",
question: "26. If 8 cos x = 3, calculate x to the nearest degree.",
A: "97°",
B: "83°",
C: "68°",
D: "67°",
answer: "C. 68°",
correctLetter: "C",
correctOption: 3,
},

{
instruction: "The table below shows the distribution of marks obtained by a class in a test. Use it to answer Questions 27 to 29.",
id: "question27",
question: "27. What is the median mark?",
A: "4",
B: "5",
C: "6",
D: "7",
answer: "B. 5",
correctLetter: "B",
correctOption: 2,
questionFigure: require(path + "2009-A-Q-27.png"),
imageRatio: .28,
},

{
id: "question28",
question: "28. What is the modal mark?",
A: "3",
B: "4",
C: "5",
D: "6",
answer: "B. 4",
correctLetter: "B",
correctOption: 2,
},

{
id: "question29",
question: "29. If a student is selected at random from the class, calculate the probability that the student obtained at most 7 marks.",
A: "1/5",
B: "7/40",
C: "5/24",
D: "19/24",
answer: "D. 19/24",
correctLetter: "D",
correctOption: 4,
},

{
id: "question30",
question: "30. Simplify (√18 × √20 × √24 ) / (√8 × √30 )",
A: "6",
B: "5",
C: "2",
D: "√3",
answer: "A. 6",
correctLetter: "A",
correctOption: 1,
},

{
id: "question31",
question: "31. Three men agree to divide an amount of money in the ratio of their ages, which are 40, 42, and 48 years. If the sum collected is D750.00, how much does the eldest receive?",
A: "D 230.77",
B: "D 242.31",
C: "D 276.92",
D: "D 315.00",
answer: "C. D 276",
correctLetter: "C",
correctOption: 3,
},

{
id: "question32",
question: "32. If Nl,250.00 amounts to Nl,400.00 in 4 years, what is the simple interest rate per annum?",
A: "4½ %",
B: "4%",
C: "3½%",
D: "3%",
answer: "D. 3%",
correctLetter: "D",
correctOption: 4,
},

{
id: "question33",
question: "33. Solve the equation (4x2 - 2)2 = 100.",
A: "-1.73 or 1.73",
B: "-2.00 or 2.00",
C: "-2.50 or 2.50",
D: "-3.50 or 3.50",
answer: "A. -1",
correctLetter: "A",
correctOption: 1,
},

{
id: "question34",
instruction: "34. Find the length of the rectangle in the diagram.",
question: " ",
A: "15cm",
B: "10cm",
C: "8cm",
D: "5cm",
answer: "A. 15cm",
correctLetter: "A",
correctOption: 1,
questionFigure: require(path + "2009-A-Q-34.png"),
imageRatio: 1,
},

{
id: "question35",
question: "35. Solve the equation 8x² - 5 = -6x",
A: "x = ½ or 1¼",
B: "x = -½ or 1¼",
C: "x = ½ or ¼",
D: "x = ½ or -1¼",
answer: "D. x = ½ or -1¼",
correctLetter: "D",
correctOption: 4,
},

{
id: "question36",
question: "36. In the diagram, PQRS is a cyclic quadrilateral. PS and QR are produced to meet at T. If ∠PQR = 80° and ∠QRS = 120° , find LRTS.",
A: "30° ",
B: "40° ",
C: "50° ",
D: "60° ",
answer: "",
correctLetter: " ",
correctOption: 9,
},


{
id: "question37",
instruction: "37. In the diagram, PR is a tangent to the circle centre O and ∠OQT = 48°.",
question: "Find ∠OTU",
A: "48°",
B: "46°",
C: "44°",
D: "42°",
answer: "D. 42°",
correctLetter: "D",
correctOption: 4,
questionFigure: require(path + "2009-A-Q-37.png"),
imageRatio: 1.0,
},

{
id: "question38",
question: "38. In a factory of 75 workers, 30 earn Gh¢15.00 each a day and each of the rest earn Gh¢9.50 a day. What is the average earning of the workers per day?",
A: "Gh¢11.70",
B: "Gh¢6.00",
C: "Gh¢3.75",
D: "Gh¢1.58",
answer: "A. Gh¢11",
correctLetter: "A",
correctOption: 1,
},

{
id: "question39",
question: "39. A cumulative frequency curve",
A: "has uniform gradient",
B: "is symmetric about the y-axis.",
C: "never decreases",
D: "always decreases.",
answer: "C. never decreases",
correctLetter: "C",
correctOption: 3,
},

{
id: "question40",
instruction: "40. From the table of values, find the quadratic equation for (x).",
question: " ",
A: "x²",
B: "x² + 3",
C: "x² + 3x",
D: "x² - 3",
answer: "B. x² + 3",
correctLetter: "B",
correctOption: 2,
questionFigure: require(path + "2009-A-Q-40.png"),
imageRatio: 0.21,
},

{
id: "question41",
question: "41. If y is a positive integer, list the values of y which satisfy the inequalities 3y - 4 < 6 and y - 1 > 0.",
A: "{ 1, 2, 3}",
B: "{2, 3}",
C: "{2, 3, 4}",
D: "{2, 3, 4, 5}",
answer: "B. {2, 3}",
correctLetter: "B",
correctOption: 2,
},

{
id: "question42",
instruction: "42. In the diagram, PQR is a triangle, TS // QR, |QR| = 9 cm, |TS| = 4 cm, and |PT| = 3 cm.",
question: "Find |TQ|.",
A: "2 cm",
B: "2½cm",
C: "334cm",
D: "4¾ cm",
answer: "",
correctLetter: "E",
correctOption: 5,
questionFigure: require(path + "2009-A-Q-42.png"),
imageRatio: 1,
}, 

{
id: "question43",
question: "43. Find the number of sides of a regular polygon whose interior angle is thrice the exterior angle.",
A: "9",
B: "8",
C: "7",
D: "5",
answer: "B. 8",
correctLetter: "B",
correctOption: 2,
},

{
id: "question44",
question: "44. PQR is a scalene triangle. If the point K is equidistant from PQ and PR and also equidistant from the vertices Q and R, then K is the intersection of;",
A: "the bisector of ∠QPR and the perpendicular bisector of QR.",
B: "the perpendicular bisectors of QP and PR.",
C: "the bisectors of ∠PQR and ∠PRQ",
D: "the perpendicular bisectors of PQ and QR.",
answer: "A. the bisector of ∠QPR and the perpendicular bisector of QR",
correctLetter: "A",
correctOption: 1,
},

{
id: "question45",
question: "45. If 125% of P equals 5% of 400, find P.",
A: "5",
B: "16",
C: "25",
D: "32",
answer: "B. 16",
correctLetter: "B",
correctOption: 2,
},

{
id: "question46",
question: "46. Solve for x in the equation: (1)3x = 81-3/4",
A: "-1",
B: "-¼",
C: "¼",
D: "1",
answer: "D. 1",
correctLetter: "D",
correctOption: 4,
},

{
instruction: "The diagram is a sector of a circle, with radius 7 cm, folded into a hollow cone. Use it to answer Questions 47 and 48. [Take n = 22/7]",
id: "question47",
question: "47. What is the base radius of the cone?",
A: "6.06 cm",
B: "4.66 cm",
C: "3.50 cm",
D: "2.33 cm",
answer: "D. 2",
correctLetter: "D",
correctOption: 4,
questionFigure: require(path + "2009-A-Q-49.png"),
imageRatio: 1,
},

{
id: "question48",
instruction: "48. What is the curved surface area of the cone?",
question: " ",
A: "51.3 cm²",
B: "44.0 cm²",
C: "38.5 cm²",
D: "77.0 cm²",
answer: "A. 51",
correctLetter: "A",
correctOption: 1,
},

{
instruction: "In the diagram POQ is a quadrant of a circle centre O and radius 14 cm. Use the information to answer Questions 49 and 50. [Take n = 22/7]",
id: "question49",
question: "49. Find the area of the quadrant OPQ.",
A: "252 cm²",
B: "154 cm²",
C: "98 cm²",
D: "56 cm²",
answer: "B. 154 cm²",
correctLetter: "B",
correctOption: 2,
questionFigure: require(path + "2009-A-Q-49.png"),
imageRatio: 1,
},

{
id: "question50",
question: "50. Find the area of the segment of the quadrant.",
A: "56 cm²",
B: "98 cm²",
C: "154 cm²",
D: "252 cm²",
answer: "A. 56 cm²",
correctLetter: "A",
correctOption: 1,
},



]