nums = [1, 2, 3, 4, 2, 5, 1, 6]

duplicates = []

for i in range(len(nums)):
    for j in range(i + 1, len(nums)):
        if nums[i] == nums[j] and nums[i] not in duplicates:
            duplicates.append(nums[i])

print(duplicates)