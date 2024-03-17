def palindrome(text: str):
    reversed = text[::-1]
    print(reversed)
    if text == reversed:
        return True
    else:
        return False


obj = palindrome("TENET")
print(obj)