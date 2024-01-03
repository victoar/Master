import math

def calculateArea(side):
    return side**2

def calculatePerimeterAndDiagonal(side):
    return 4*side, math.sqrt(2)*side

def calculateHypotenuse(leg1, leg2):
    return math.sqrt(leg1**2 + leg2**2)

def isPossibleToBuildTriangle(leg1, leg2, leg3):
    if leg1 + leg2 > leg3 or leg1 + leg3 > leg2 or leg2 + leg3 > leg1:
        return 1
    else:
        return 0

def returnFirstDigitOfNumber(n):
    while n > 10:
        n = int(n / 10)
    return n

def isPrimeNumber(n):
    if n == 1 or n == 0:
        return False
    for i in range(2, int(n/2) + 1):
        if n % i == 0:
            return False
    return True

def printPrimeNumbersBetween(a, b):
    for i in range (a, b + 1):
        if isPrimeNumber(i):
            print(i, end=" ")
    print()

def sumOfDigits(n):
    s = 0
    while n > 0:
        s += n % 10
        n = int(n / 10)
    return s

def printNumbersThatDivideBySumOfDigits(a, b):
    for i in range (a, b + 1):
        if i % sumOfDigits(i) == 0:
            print(i, end=" ")
    print()

def printMenu():
    print("1. Area of a square")
    print("2. Perimeter and diagonal of a square")
    print("3. Find hypotenuse of a triangle")
    print("4. Can you build a triangle?")
    print("5. First digit of a number")
    print("6. Print all prime numbers between 2 numbers")
    print("7. Numbers that are divided by their sum")
    print("0. Exit")

if __name__ == '__main__':
    printMenu()
    while True:
        option = int(input("Choose an option: "))
        if option == 1:
            side_length = int(input("Side length: "))
            print("Area: " + str(calculateArea(side_length)))
        if option == 2:
            side_length = int(input("Side length: "))
            print("Diagonal and perimeter are: " + str(calculatePerimeterAndDiagonal(side_length)))
        if option == 3:
            leg1 = int(input("Choose leg one: "))
            leg2 = int(input("Choose leg two: "))
            print("Hypotenuse is: " + str(calculateHypotenuse(leg1, leg2)))
        if option == 4:
            leg1 = int(input("Choose leg 1: "))
            leg2 = int(input("Choose leg 2: "))
            leg3 = int(input("Choose leg 3: "))
            print("Is triangle? " + str(isPossibleToBuildTriangle(leg1, leg2, leg3)))
        if option == 5:
            n = int(input("Choose a number: "))
            print("First digit is: " + str(returnFirstDigitOfNumber(n)))
        if option == 6:
            start = int(input("Start: "))
            end = int(input("End: "))
            printPrimeNumbersBetween(start, end)
        if option == 7:
            start = int(input("Start: "))
            end = int(input("End: "))
            printNumbersThatDivideBySumOfDigits(start, end)
        if option == 0:
            break
