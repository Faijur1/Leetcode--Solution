class ProductOfNumbers(object):

    def __init__(self):
        # Initialize with 1 as a neutral multiplicative identity
        self.prefix = [1]

    def add(self, num):
        """
        :type num: int
        :rtype: None
        """
        if num == 0:
            # Reset the prefix array because any future product 
            # spanning across this zero will be 0.
            self.prefix = [1]
        else:
            # Append the running product
            self.prefix.append(self.prefix[-1] * num)

    def getProduct(self, k):
        """
        :type k: int
        :rtype: int
        """
        # If k >= len(self.prefix), the requested range includes a 0 
        # that caused a reset.
        if k >= len(self.prefix):
            return 0
        
        # Integer division (//) is safe here as prefix[-1] is an exact 
        # multiple of prefix[-1 - k]
        return self.prefix[-1] // self.prefix[-1 - k]