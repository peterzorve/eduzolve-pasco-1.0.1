import { SquareRoot, superscript, subscript, BoldText, ItalicText, Fraction, ShortFraction, LongFraction, MixedFraction, Isotopes } from "@/mathnotation"

const path = "@/assets/images/pastquestions-figures/coremathematics/coremathematicsA/coremathematics-"


export const COREMATHEMATICSA2014 = [

{
section: "1",
sectiontitle: "********************",
id: "question1",
question: "1. Simplify: 10²/₅ - 6²/₃ + 3",
A: "6 4/15",
B: "6 11/15",
C: "7 4/15",
D: "6 11/15",
answer: "B. 6 11/15",
correctLetter: "B",
correctOption: 2,
},

{
id: "question2",
question: "2. If 23ₙ = 32₅, find the value of n.",
A: "7",
B: "6",
C: "5",
D: "4",
answer: "A. 7",
correctLetter: "A",
correctOption: 1,
},

{
id: "question3",
question: "3. The volume of a cube is 512 cm³. Find the length of its side.",
A: "6 cm",
B: "7 cm",
C: "8 cm",
D: "9 cm",
answer: "C. 8 cm",
correctLetter: "C",
correctOption: 3,
},

{
instruction: "The histogram shows the scores of some students in a test. Use it to answer Questions 4 and 5.",
id: "question4",
question: "4. How many students took the test?",
A: "18",
B: "19",
C: "20",
D: "22",
answer: "C. 20",
correctLetter: "C",
correctOption: 3,
questionFigure: require(path + "2014-A-Q-4.png"),
imageRatio: 1,
},

{
id: "question5",
question: "5. If one student is selected at random, find the probability that he/she scored at most 2 marks.",
A: "11/18",
B: "11/20",
C: "7/22",
D: "5/19",
answer: "B. 11/20",
correctLetter: "B",
correctOption: 2,
},

{
id: "question6",
question: "6. Simplify: √12 (√48 - √3).",
A: "18",
B: "16",
C: "14",
D: "12",
answer: "A. 18",
correctLetter: "A",
correctOption: 1,
},

{
id: "question7",
question: "7. Which of the following number lines represents the solution to the inequality -9 ≤ 23x - 7 < 5?",
A: "  ",
B: "  ",
C: "  ",
D: "  ",
answer: "D. ****",
correctLetter: "D",
correctOption: 4,
questionFigure: require(path + "2014-A-Q-7.png"),
imageRatio: 0.45,
},

{
id: "question8",
question: "8. In the diagram, the value of x + y = 220°. Find the value of n.",
A: "20°",
B: "40°",
C: "60°",
D: "80°",
answer: "B. 40°",
correctLetter: "B",
correctOption: 2,
questionFigure: require(path + "2014-A-Q-8.png"),
imageRatio: 1,
},

{
id: "question9",
question: "9. Given that x > y and 3 < y, which of the following is/are true? \nI.	y > 3 \nII.	x < 3 \nIII.	x < y > 3",
A: "I only",
B: "I and II only",
C: "I and III only",
D: "I. II and III",
answer: "A. I only",
correctLetter: "A",
correctOption: 1,
},

{
id: "question10",
question: "10. Three quarters of a number added to two and a half of that number gives 13. Find the number.",
A: "4",
B: "5",
C: "6",
D: "7",
answer: "A. 4",
correctLetter: "A",
correctOption: 1,
},

{
id: "question11",
question: "11. If X = {0, 2, 4, 6}, Y = {1, 2, 3, 4} and Z = {1, 3} are subsets of U = {x: 0 ≤ x ≤ 6}, find X ∩ (Y' U Z).",
A: "{0, 2, 6}",
B: "{1,3}",
C: "{0,6}",
D: "{ }",
answer: "D. {0,6}",
correctLetter: "D",
correctOption: 4,
},

{
id: "question12",
question: "12. Find the truth set of the equation x² = 3(2x + 9).",
A: "{x: x=3, x = 9}",
B: "{x : x =-3,x = -9}",
C: "{x : x = 3, x = -9}",
D: "{x : x = -3, x = 9}",
answer: "D. {x : x = -3, x = 9}",
correctLetter: "D",
correctOption: 4,
},

{
id: "question13",
question: "13. The coordinates of points P and Q are (4, 3) and(2, -1) respectively. Find the shortest distance between P and Q.",
A: "10√2",
B: "4√5",
C: "5√2",
D: "2√5",
answer: "D. 2√5",
correctLetter: "D",
correctOption: 4,
},

{
id: "question14",
question: "14. Make u the subject of the formula E = (m/2g) (v² - u²)",
A: "u = (v² - (2Eg/m))",
B: "u = (v² - (2Eg)/4)",
C: "u = (v - (2Eg)/4)",
D: "u = (2v²Eg)/m",
answer: "A. ****",
correctLetter: "A",
correctOption: 1,
},

{
id: "question15",
instruction: "15. In the diagram, ∠QPT = ∠PTS = 90°. ∠PQR = 110° and ∠TSR = 20°.",
question: "Find the size of the obtuse angle QRS.",
A: "140°",
B: "130°",
C: "120°",
D: "110°",
answer: "B. 130°",
correctLetter: "B",
correctOption: 2,
questionFigure: require(path + "2014-A-Q-15.png"),
imageRatio: 1,
},

{
id: "question16",
question: "16. If x varies inversely as y and y varies directly as z, what is the relationship between x and z?",
A: "x α Z",
B: "x α 1/z",
C: "x α z2",
D: "x α 1/z2",
answer: "B. x α 1/z",
correctLetter: "B",
correctOption: 2,
},

{
id: "question17",
question: "17. Find the gradient of the line joining the points (2, -3) and (2, 5).",
A: "0",
B: "1",
C: "2",
D: "undefined",
answer: "D. undefined",
correctLetter: "D",
correctOption: 4,
},

{
id: "question18",
question: "18. If (x - a) is a factor of bx - ax + x² - ab, find the other factor.",
A: "(x+b)",
B: "(x-b)",
C: "(a+b)",
D: "(a-b)",
answer: "A. (x+b)",
correctLetter: "A",
correctOption: 1,
},

{
id: "question19",
instruction: "19. The table shows the distribution of the height of plants in a nursery. ",
question: "Calculate the mean height of the plants.",
A: "3.8",
B: "3.0",
C: "2.8",
D: "2.3",
answer: "A. 3",
correctLetter: "A",
correctOption: 1,
questionFigure: require(path + "2014-A-Q-19.png"),
imageRatio: 0.55,
},

{
id: "question20",
question: "20. In the diagram, PQR is a straight line, (m + n) = 120° and (n + r) = 100°. Find the value of (m + r).",
A: "110°",
B: "120°",
C: "140°",
D: "160°",
answer: "C. 140°",
correctLetter: "C",
correctOption: 3,
questionFigure: require(path + "2014-A-Q-20.png"),
imageRatio: 1,
},

{
instruction: "In the diagram, SR is parallel to UW, ∠WVT = x°, ∠VUT = y°, ∠RSV = 45° and ∠VTU = 20°. Use this diagram to answer questions 21 and 22.",
id: "question21",
question: "21. Find the value of x.",
A: "20",
B: "45",
C: "65",
D: "135",
answer: "B. 45",
correctLetter: "B",
correctOption: 2,
questionFigure: require(path + "2014-A-Q-21.png"),
imageRatio: 1,
},

{
id: "question22",
question: "22. Calculate the value of y.",
A: "20",
B: "25",
C: "45",
D: "65",
answer: "B. 25",
correctLetter: "B",
correctOption: 2,
},

{
id: "question23",
question: "23. The area of a sector of a circle with diameter 12 cm is 66 cm. If the sector is folded to form a cone, calculate the radius of the base of the cone. [Take π = 22/7]",
A: "3.0 cm",
B: "3.5 cm",
C: "7.0 cm",
D: "7.5 cm",
answer: "B. 3",
correctLetter: "B",
correctOption: 2,
},

{
id: "question24",
question: "24. A chord, 7 cm long, is drawn in a circle with radius 3.7 cm. Calculate the distance of the chord from the centre of the circle.",
A: "0.7 cm",
B: "1.2 cm",
C: "2.0 cm",
D: "2.5 cm",
answer: "B. 1",
correctLetter: "B",
correctOption: 2,
},

{
id: "question25",
question: "25. Which of the following is a measure of dispersion?",
A: "Range",
B: "Percentile",
C: "Median",
D: "Quartile",
answer: "A. Range",
correctLetter: "A",
correctOption: 1,
},

{
id: "question26",
question: "26. A box contains 13 currency notes, all of which are either N 50 or N 20 notes. The total value of the currency notes is N 530. How many N 50 notes are in the box?",
A: "4",
B: "6",
C: "8",
D: "9",
answer: "D. 9",
correctLetter: "D",
correctOption: 4,
},

{
instruction: "The graph is for the relation y = 2x +x-1. Use it to answer questions 27 and 28.",
id: "question27",
question: "27. What are the coordinates of the points S?",
A: "(1,0.2)",
B: "(1,0.4)",
C: "(1,2.0)",
D: "(1,4.0)",
answer: "C. (1,2",
correctLetter: "C",
correctOption: 3,
questionFigure: require(path + "2014-A-Q-27.png"),
imageRatio: 1,
},

{
id: "question28",
question: "28. Find the minimum value of y.",
A: "0.00",
B: "-0.65",
C: "-1.25",
D: "-2.10",
answer: "C. -1",
correctLetter: "C",
correctOption: 3,
},

{
id: "question29",
question: "29. A ship sails x km due east to a point E and continues x km due north to F. Find the bearing of F from the starting point.",
A: "045°",
B: "090°",
C: "135°",
D: "225°",
answer: "A. 045°",
correctLetter: "A",
correctOption: 1,
},

{
id: "question30",
question: "30. If x : y = 3 : 2 and y : z = 5 : 4, find the value of x in the ratio x : y : z.",
A: "8",
B: "10",
C: "15",
D: "20",
answer: "C. 15",
correctLetter: "C",
correctOption: 3,
},

{
id: "question31",
question: "31. A trader bought sachet water for GH¢55.00 per dozen and sold them at 10 for GH¢50.00. Calculate, correct to 2 decimal places, his percentage gain.",
A: "8.00%",
B: "8.30%",
C: "9.09%",
D: "10.00%",
answer: "C. 9",
correctLetter: "C",
correctOption: 3,
},

{
id: "question32",
question: "32. In the figure, PQ is a tangent to the circle at R and UT is parallel to PQ. If ∠TRO =x°, find ∠URT in terms of x.",
A: "2x°",
B: "(90 - x)°",
C: "(90 + x)°",
D: "(180 - 2x)°",
answer: "D. (180 - 2x)°",
correctLetter: "D",
correctOption: 4,
questionFigure: require(path + "2014-A-Q-32.png"),
imageRatio: 1,
},

{
id: "question33",
question: "33. Given that cos x = 12/13, evaluate (1 - tan x)/(tan x)",
A: "5/13",
B: "5/7",
C: "17/5",
D: "13/5",
answer: "B. 5/7",
correctLetter: "B",
correctOption: 2,
},

{
id: "question34",
question: "34. Approximate 0.0033780 to 3 significant figures.",
A: "338",
B: "0.338",
C: "0.00338",
D: "0.003",
answer: "B. 0",
correctLetter: "B",
correctOption: 2,
},

{
id: "question35",
question: "35. Simplify: ((8² × 4ⁿ + 1) / (2²n × 16))",
A: "16",
B: "8",
C: "4",
D: "1",
answer: "C. 4",
correctLetter: "C",
correctOption: 3,
},

{
id: "question36",
question: "36. If 2/(x - 3) - 3(x - 2) is equal to P/((x - 3)(x - 2))  	Find P.",
A: "-x - 5",
B: "-(x + 3)",
C: "5x - 13",
D: "5 - x",
answer: "D. 5-x",
correctLetter: "D",
correctOption: 4,
},

{
id: "question37",
question: "37. Subtract ¹/₂(a - b - c) from the sum of ¹/₂(a - b + c) and ¹/₂(a + b - c)",
A: "¹/₂(a + b + c)",
B: "¹/₂(a - b - c)",
C: "¹/₂(a - b + c)",
D: "¹/₂(a + b - c)",
answer: "A. ¹/₂(a + b + c)",
correctLetter: "A",
correctOption: 1,
},

{
id: "question38",
question: "38. A man's eye level is 1.7 m above the horizontal ground and 13 m from a vertical pole. If the pole is 8.3 m high, calculate, correct to the nearest degree, the angle of elevation of the top of the pole from his eyes.",
A: "33°",
B: "32°",
C: "27°",
D: "26°",
answer: "C. 27°",
correctLetter: "C",
correctOption: 3,
},

{
id: "question39",
question: "39. A chord subtends an angle of 120 at the centre of a circle of radius 3.5 cm. Find the perimeter of the minor sector containing the chord. [Take rr = 22/7]",
A: "14¹/₂",
B: "12⁵/₆",
C: "8¹/₇",
D: "7¹/₂",
answer: "A. 14¹/₂",
correctLetter: "A",
correctOption: 1,
},

{
id: "question40",
question: "40. In parallelogram PORS. OR is produced to M such that |QR|=|RM|. What fraction of the area of PQMS is the area of PRMS?",
A: "¼",
B: "1/3",
C: "2/3",
D: "3/4",
answer: "A. 1/4",
correctLetter: "A",
correctOption: 1,
},

{
id: "question41",
instruction: "41. Determine the value of m in the diagram.",
question: " ",
A: "80°",
B: "90°",
C: "110°",
D: "150°",
answer: "B. 90°",
correctLetter: "B",
correctOption: 2,
questionFigure: require(path + "2014-A-Q-41.png"),
imageRatio: 1,
},

{
id: "question42",
question: "42. In a cumulative frequency graph, the lower quartile is 18 years while the 60th percentile is 48 years. What percentage of the distribution is at most 18 years or greater than 48 years?",
A: "15%",
B: "35%",
C: "65%",
D: "85%",
answer: "C. 65%",
correctLetter: "C",
correctOption: 3,
},

{
id: "question43",
question: "43. If a number is selected at random from each of the sets P = {1, 2, 3} and Q= {2, 3, 5}, find the probability that the sum of the numbers is prime.",
A: "5/9",
B: "4/9",
C: "1/3",
D: "2/9",
answer: "C. 1/3",
correctLetter: "C",
correctOption: 3,
},

{
id: "question44",
instruction: "44. In the diagram, O is the centre of the circle, PR is a tangent to the circle at Q and ∠SOQ = 86°. ",
question: "Calculate the value of ∠SQR.",
A: "43°",
B: "47°",
C: "54°",
D: "86°",
answer: "D. 86°",
correctLetter: "D",
correctOption: 4,
questionFigure: require(path + "2014-A-Q-44.png"),
imageRatio: 1,
},

{
id: "question45",
question: "45. If log 5.957 = 0.7750, find log 3√0.0005957.",
A: "4.1986",
B: "2.9250",
C: "1.5917",
D: "1.2853",
answer: "B. 2",
correctLetter: "B",
correctOption: 2,
},

{
id: "question46",
question: "46. The probability of an event P happening is 1/5 and that of event Q is 1/4. If the events are independent, what is the probability that neither of them happens?",
A: "4/5",
B: "3/4",
C: "3/5",
D: "1/20",
answer: "C. 3/5",
correctLetter: "C",
correctOption: 3,
},

{
id: "question47",
question: "47. Each exterior angle of a polygon is 30°. Calculate the sum of the interior angles.",
A: "540°",
B: "720°",
C: "1080°",
D: "1800°",
answer: "D. 1800°",
correctLetter: "D",
correctOption: 4,
},

{
id: "question48",
question: "48. Find the number of terms in the Arithmetic Progression (A.P) 2, -9, -20, ..., -141.",
A: "11",
B: "12",
C: "13",
D: "14",
answer: "D. 14",
correctLetter: "D",
correctOption: 4,
},

{
id: "question49",
question: "49. In what modulus is it true that 9 + 8 = 5?",
A: "mod 10",
B: "mod 11",
C: "mod 12",
D: "mod 13",
answer: "C. mod 12",
correctLetter: "C",
correctOption: 3,
},

{
id: "question50",
question: "50. The radii of the base of two cylindrical tins, P and Q are r and 2r, respectively. If the water level in P is 10 cm high, what would be the height of the same quantity of water in Q?",
A: "2.5 cm",
B: "5.0 cm",
C: "7.5 cm",
D: "20.0 cm",
answer: "A. 2",
correctLetter: "A",
correctOption: 1,
},

]